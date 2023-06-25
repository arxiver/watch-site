import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { Site } from './entities/site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SiteReportModule } from 'src/site-report/site-report.module';
import { JWTConfig } from 'config';
import { SiteReportService } from 'src/site-report/site-report.service';
import { SiteReport } from 'src/site-report/entities/site-report.entity';
import { MailModule } from 'src/mail/mail.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { TaskService } from 'src/tasks/tasks.service';

@Module({
 controllers: [SiteController],
 providers: [SiteService, SiteReportService, TaskService],
 imports: [
   TypeOrmModule.forFeature([Site, SiteReport]),
   JwtModule.registerAsync(JWTConfig()),
   SiteReportModule,
   UserModule,
   MailModule,
   HttpModule,
 ],
 exports: [SiteService],
})
export class SiteModule {}
