import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { toObjectId } from 'src/utils';
import { AuthGuard } from 'src/auth.gaurd';
import { User } from 'src/user/user.decorator';
import { ObjectId } from 'typeorm';
import { SiteReportService } from 'src/site-report/site-report.service';
import { TaskService } from 'src/tasks/tasks.service';

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

  // Create the task document
  this.taskService.create(site._id.toString(), site.interval,
   await this.siteReportService.siteCheckCallback.bind(this, site._id, userId));

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
 @Get('reports')
 async getReports(@User() userId: ObjectId) {
  const siteReport = await this.siteReportService.findAll({ where: { userId: toObjectId(userId) } });
  return siteReport;
 }

 @ApiBearerAuth()
 @UseGuards(AuthGuard)
 @Get('reports/:id')
 async getReport(@User() userId: ObjectId, @Param('id') id: string) {
  const siteReport = await this.siteReportService.findOneBy({ where: { userId: toObjectId(userId), siteId: toObjectId(id) } });
  return siteReport;
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
    this.siteReportService.siteCheckCallback.bind(this, site._id, userId));
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

}
