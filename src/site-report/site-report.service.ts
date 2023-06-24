import { Injectable } from '@nestjs/common';
import { CreateSiteReportDto } from './dto/create-site-report.dto';
import { UpdateSiteReportDto } from './dto/update-site-report.dto';
import { SiteReport } from './entities/site-report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Site } from '../site/entities/site.entity';
import { HttpService } from '@nestjs/axios';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { UpdateSiteDto } from 'src/site/dto/update-site.dto';
import { CreateSiteDto } from 'src/site/dto/create-site.dto';

@Injectable()
export class SiteReportService {
  constructor(
    @InjectRepository(SiteReport)
    private readonly siteReportRepository: Repository<SiteReport>,
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) { }
  create(createSiteReportDto: CreateSiteReportDto) {
    return this.siteReportRepository.save(createSiteReportDto);
  }

  findAll(findOpts?: FindManyOptions<SiteReport>) {
    return this.siteReportRepository.find(findOpts);
  }

  findOneById(id: ObjectId) {
    return this.siteReportRepository.findOneBy({ _id: id });
  }

  findOneBySiteId(id: ObjectId) {
    return this.siteReportRepository.findOneBy({ siteId: id });
  }

  findOneBy(findOneOpts?: FindOneOptions<SiteReport>) {
    return this.siteReportRepository.findOne(findOneOpts);
  }

  async update(id: ObjectId, updateSiteReportDto: UpdateSiteReportDto) {
    const siteReport = await this.siteReportRepository.findOneBy({ _id: id });
    const updated = await this.siteReportRepository
      .update(id, { ...siteReport, ...updateSiteReportDto, _id: id })
      .then(() => this.siteReportRepository.findOneBy({ _id: id }));
    return updated;
  }

  remove(id: ObjectId) {
    return this.siteReportRepository.softDelete(id);
  }

  removeBySiteId(id: ObjectId) {
    return this.siteReportRepository.delete({ siteId: id });
  }


  /*
    _   _ _____ ___ _     ____  
  | | | |_   _|_ _| |   / ___| 
  | | | | | |  | || |   \___ \ 
  | |_| | | |  | || |___ ___) |
   \___/  |_| |___|_____|____/ 
                               
  */

  siteCheckCallback = async (siteId: ObjectId, userId?: ObjectId) => {
    // Get the site
    const site = await this.siteRepository.findOneBy({ _id: siteId });
    const siteReport = await this.findOneBySiteId(siteId);
    // console.log(site);
    if (!siteReport) { console.log("Site report not found"); return };

    // Site check
    const url = this.parseSiteURL(site);
    const headersObject = this.parseSiteHeaders(site);

    // Get the start time
    const startTime = new Date();

    // Make the request
    let response;
    try {
      response = await this.doRequest(url, site, headersObject);
      const endTime = new Date();
      const responseTime = endTime.getTime() - startTime.getTime();
      const expectedCode = site.assertCode ? site.assertCode : 200;
      if (response.status !== expectedCode) throw new Error(`Expected status code ${expectedCode} but got ${response.status}`);
      siteReport.status = "UP";
      siteReport.responseTime = !siteReport.responseTime
        ? responseTime : (responseTime + siteReport.responseTime) / 2;
      siteReport.uptime = !siteReport.uptime ? 1 : siteReport.uptime + 1;
    } catch (error) {
      response = error.response;
      siteReport.status = "DOWN";
      siteReport.downtime += 1;
      siteReport.outages += 1;
      if (siteReport.outages >= site.threshold) {
        // Send notification
        const notified = this.notifyDown(site, userId);
        if (notified) siteReport.outages = 0;
      }
    }
    // Update the site report
    siteReport.updatedAt = new Date();
    if (!Array.isArray(siteReport.history))
      siteReport.history = [{ at: siteReport.updatedAt, status: siteReport.status }];
    else {
      if (siteReport.history[siteReport.history.length - 1].status !== siteReport.status
        && siteReport.status === "UP") {
        // Send notification
        const notified = this.notifyUp(site, userId);
        if (notified) siteReport.outages = 0;
      }
      siteReport.history.push({ at: siteReport.updatedAt, status: siteReport.status });
    }

    siteReport.availability = (siteReport.uptime / (siteReport.uptime + siteReport.downtime) * 100);

    // Update the site report
    siteReport.updatedAt = new Date();
    siteReport.siteId = site._id;
    siteReport.userId = userId;
    const siteReportUpdated = await this.update(siteReport._id, siteReport);
    console.log(siteReportUpdated);
    return siteReport;
  }

  async doRequest(url: string, site: Site, headersObject: {}) {
    return await this.httpService.get(url, {
      timeout: site.timeout,
      timeoutErrorMessage: `Request timeout could not reach in ${site.timeout} s`,
      auth: {
        username: site.authUsername,
        password: site.authPassword,
      },
      withCredentials: site.authUsername && site.authPassword ? true : false,
      headers: headersObject,
    }).toPromise();
  }

  async createSiteReport(siteId: ObjectId, userId: ObjectId) {
    const siteReport = await this.create({
      siteId: siteId,
      userId: userId,
      status: "UNKNOWN",
      availability: 0,
      outages: 0,
      downtime: 0,
      uptime: 0,
      responseTime: 0,
    });
    return siteReport;
  }

  parseSiteHeaders(site: Site) {
    const headersObject = {};
    site.httpHeaders.forEach(header => {
      if (header[0] && header[1]) headersObject[header[0]] = header[1];
    });
    return headersObject;
  }

  parseSiteURL(site: Site | CreateSiteDto | UpdateSiteDto) {
    if (site.url.startsWith("http://") || site.url.startsWith("https://") ||
      site.url.startsWith("tcp://")) return site.url;
    let url = site.protocol + ":" + (site.port ? site.url + ":" + site.port : site.url);
    if (site.path && site.path[0] !== "/") site.path = "/" + site.path;
    if (url[url.length - 1] === "/") url = url.slice(0, -1);
    if (site.path) url += site.path;
    return url;
  }

  async notifyDown(site: Site, userId: ObjectId) {
    // Call of the proposed notifications services here
    const user = await this.userService.findOne(userId);
    try {
      await this.mailService.sendDownSiteEmail(user.name, user.email, site.name, site.url);
      return true;
    } catch (error) {
      return false;
    }
  }

  async notifyUp(site: Site, userId: ObjectId) {
    // Call of the proposed notifications services here
    const user = await this.userService.findOne(userId);
    try {
      await this.mailService.sendUpSiteEmail(user.name, user.email, site.name, site.url);
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkSiteUpdate(site: Site, updateSiteDto: UpdateSiteDto) {
    if (updateSiteDto.interval !== site.interval ||
      this.parseSiteURL(site) !== this.parseSiteURL(updateSiteDto) ||
      site.timeout !== updateSiteDto.timeout ||
      site.assertCode !== updateSiteDto.assertCode ||
      site.threshold !== updateSiteDto.threshold ||
      site.httpHeaders !== updateSiteDto.httpHeaders ||
      site.authUsername !== updateSiteDto.authUsername ||
      site.authPassword !== updateSiteDto.authPassword ||
      site.ignoreSSL !== updateSiteDto.ignoreSSL ||
      site.webhook !== updateSiteDto.webhook
    ) {
      return true;
    } return false;
  }
}
