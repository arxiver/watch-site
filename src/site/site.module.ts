import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { MailModule } from 'src/mail/mail.module';
import { Site } from './entities/site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { TaskService } from 'src/tasks/tasks.service';
import { SiteReportModule } from 'src/site-report/site-report.module';
import { SiteReportService } from 'src/site-report/site-report.service';
import { SiteReport } from 'src/site-report/entities/site-report.entity';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/user/user.decorator';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JWTConfig } from 'config';

@Module({
 controllers: [SiteController],
 providers: [SiteService, MailService, TaskService, SiteReportService, UserService],
 imports: [
  TypeOrmModule.forFeature([Site]),
  JwtModule.registerAsync(JWTConfig()),
  HttpModule,
  TypeOrmModule.forFeature([SiteReport]),
  TypeOrmModule.forFeature([User]),
  MailModule,
  SiteReportModule,
  UserModule,
 ],
 exports: [SiteService],
})
export class SiteModule {}
