import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SiteReportService } from './site-report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.gaurd';
import { User } from 'src/user/user.decorator';
import { ObjectId } from 'typeorm';
import { SearchSiteReportDto } from './dto/search-site-report.dto';
import { toObjectId } from 'src/utils';

@ApiTags('site-report')
@Controller('site-report')
export class SiteReportController {
  constructor(private readonly siteReportService: SiteReportService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() userId: ObjectId) {
    return this.siteReportService.findAll({where: {userId: userId}});
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@User() userId: ObjectId, @Param('id') id: string) {
    return this.siteReportService.findOneBy({where: {userId: userId, _id: toObjectId(id)}});
  }

}
