import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SiteReportService } from './site-report.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.gaurd';
import { User } from 'src/user/user.decorator';
import { ObjectId } from 'typeorm';

@Controller('site-report')
export class SiteReportController {
  constructor(private readonly siteReportService: SiteReportService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() userId: ObjectId) {
    return this.siteReportService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() userId: ObjectId, @Param('id') id: ObjectId) {
    return this.siteReportService.findOneById(id);
  }

}
