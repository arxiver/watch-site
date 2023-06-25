import { Module } from '@nestjs/common';
import { SiteReportService } from './site-report.service';
import { SiteReportController } from './site-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteReport } from './entities/site-report.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from 'config';
import { User } from 'src/user/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { SiteService } from 'src/site/site.service';
import { Site } from 'src/site/entities/site.entity';
import { MailService } from 'src/mail/mail.service';
import { TaskService } from 'src/tasks/tasks.service';

@Module({
  controllers: [SiteReportController],
  imports: [
    TypeOrmModule.forFeature([SiteReport, User, Site]),
    JwtModule.registerAsync(JWTConfig()),
    MailModule,
    HttpModule,
    UserModule,
  ],
  providers: [SiteReportService, SiteService, MailService, TaskService]
})
export class SiteReportModule { }
