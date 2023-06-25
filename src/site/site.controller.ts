import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { toObjectId } from 'src/utils';
import { AuthGuard } from 'src/auth.gaurd';
import { User } from 'src/user/user.decorator';
import { In, ObjectId, Any, ArrayContains, ArrayContainedBy, ArrayOverlap } from 'typeorm';
import { SiteReportService } from 'src/site-report/site-report.service';
import { TaskService } from 'src/tasks/tasks.service';
import { SiteReport } from 'src/site-report/entities/site-report.entity';
import { SearchSiteReportDto } from 'src/site-report/dto/search-site-report.dto';

@ApiTags('site')
@Controller('site')
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly siteReportService: SiteReportService,
    private readonly taskService: TaskService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@User() userId: ObjectId, @Body() createSiteDto: CreateSiteDto) {
    // Create the site 
    createSiteDto.userId = userId;
    const site = await this.siteService.create(createSiteDto);
    // Create the site report 
    const siteReport = await this.siteReportService.createSiteReport(site._id, userId);

    // Update the site with the site report id
    site.reportId = siteReport._id;
    await this.siteService.update(site);

    // Create the task document
    this.taskService.create(site._id.toString(), site.interval,
      await this.siteReportService.siteCheckCallback.bind(this, site._id));

    return site;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() userId: ObjectId) {
    return this.siteService.findAll(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/search')
  async findReportByTags(@User() userId: ObjectId, @Body() search: SearchSiteReportDto) {
    // Find all sites with the tags in the search 
    const sites = await this.siteService.findAll(userId, { where: { "tags": ({ "$in": search.tags }) as unknown as string } });
    const reports = this.siteReportService.findAll({ where: { siteId: ({ "$in": sites.map(site => site._id) }) as unknown as string } });
    return reports;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('reports')
  async getReports(@User() userId: ObjectId) {
    let reports = await this.siteReportService.findAll({ where: { userId: toObjectId(userId) } });
    reports = await Promise.all(reports.map(async (report) => {
      return this.prepareSiteReport(report);
    }));
    return reports;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id/report')
  async getReport(@User() userId: ObjectId, @Param('id') id: string) {
    const report = await this.siteReportService.findOneBy({ where: { userId: toObjectId(userId), siteId: toObjectId(id) } });
    return this.prepareSiteReport(report);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() userId: ObjectId, @Param('id') id: string) {
    return this.siteService.findOne(userId, toObjectId(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@User() userId: ObjectId, @Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    const site = await this.siteService.findOne(userId, toObjectId(id));
    const updatedSite = await this.siteService.update({ ...site, ...updateSiteDto, _id: toObjectId(id) });
    const updateTask = await this.siteReportService.checkSiteUpdate(site, updateSiteDto);
    if (updateTask) {
      this.taskService.update(site._id.toString(), site.interval,
        this.siteReportService.siteCheckCallback.bind(this, site._id));
    }
    return updatedSite;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@User() userId: ObjectId, @Param('id') id: string) {
    this.taskService.remove(id);
    this.siteReportService.removeBySiteId(toObjectId(id));
    return this.siteService.remove(userId, toObjectId(id));
  }

  async prepareSiteReport(report: SiteReport) {
    const site = await this.siteService.findOneRoot(report.siteId as ObjectId);
    report.downtime = report.downtime * site.interval * 60;
    report.uptime = report.uptime * site.interval * 60;
    return report;
  }
}
