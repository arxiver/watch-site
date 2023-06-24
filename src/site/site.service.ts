import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { ObjectId } from 'typeorm';

@Injectable()
export class SiteService {
 public constructor(
  @InjectRepository(Site)
  private readonly siteRepository: Repository<Site>,
  private readonly mailService: MailService,
 ) {}
 async create(createSiteDto: CreateSiteDto) {
  return await this.siteRepository.save({ ...createSiteDto, createdAt: new Date(), updatedAt: new Date() });
 }

 findAll(userId: ObjectId, findOpts?: FindManyOptions<Site>) {
  return this.siteRepository.find({ ...findOpts, where: { userId } });
 }

 findAllRoot(findOpts?: FindManyOptions<Site>) {
  return this.siteRepository.find({ ...findOpts});
 }

 findOne(userId: ObjectId, id: ObjectId) {
  return this.siteRepository.findOneBy({ _id: id, userId: userId });
 }

 async findOneAndUpdate(userId: ObjectId, id: ObjectId, updateSiteDto: UpdateSiteDto) {
  const site = await this.siteRepository.findOneBy({ _id: id, userId: userId });
  const updated = await this.siteRepository
   .update(id, { ...site, ...updateSiteDto, userId: userId, _id: id, updatedAt: new Date() })
   .then(() => this.siteRepository.findOneBy({ _id: id, userId: userId }));
  return updated;
 }

 async update(updateSite: Site) {
  const updated = await this.siteRepository
   .update(updateSite._id, { ...updateSite, updatedAt: new Date() })
   .then(() => this.siteRepository.findOneBy({ _id: updateSite._id }));
  return updated;
 }


 remove(userId: ObjectId, id: ObjectId) {
  return this.siteRepository.delete({ _id: id, userId: userId });
 }
}
