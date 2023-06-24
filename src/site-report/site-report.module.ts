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
import { Site } from 'src/site/entities/site.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [SiteReportController],
  imports: [
    TypeOrmModule.forFeature([SiteReport]),
    TypeOrmModule.forFeature([Site]),
    TypeOrmModule.forFeature([User]),
    MailModule,
    HttpModule,
    UserModule,
    JwtModule.registerAsync(JWTConfig())],
  providers: [SiteReportService],
})
export class SiteReportModule { }
