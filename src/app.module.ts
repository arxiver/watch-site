import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { SiteModule } from './site/site.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from '../config';
import { SiteReportModule } from './site-report/site-report.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './tasks/tasks.service';
import { BootloaderService } from './bootloader/bootloader.service';
import { Site } from './site/entities/site.entity';
import { SiteReportService } from './site-report/site-report.service';
import { SiteReport } from './site-report/entities/site-report.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
 imports: [
  ConfigModule.forRoot({
   isGlobal: true,
   envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({
   useFactory: async (config: ConfigService) => ({
    type: 'mongodb',
    url: config.get('DB_URL'),
    database: config.get('DB_NAME'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: false,
   }),
   inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([Site, SiteReport]),
  JwtModule.registerAsync(JWTConfig()),
  MailModule,
  UserModule,
  SiteModule,
  SiteReportModule,
  HttpModule,
 ],
 controllers: [AppController],
 providers: [AppService, TaskService, SiteReportService, BootloaderService],
})
export class AppModule {}

/*
 * @Author: Mohamed Mokhtar
 * @Date: 2023-06-20
 * @Website: https://rrrokhtar.me
 *                      _    _     _
 *  _ __ _ __ _ __ ___ | | _| |__ | |_ __ _ _ __
 * | '__| '__| '__/ _ \| |/ / '_ \| __/ _` | '__|
 * | |  | |  | | | (_) |   <| | | | || (_| | |
 * |_|  |_|  |_|  \___/|_|\_\_| |_|\__\__,_|_|
 *
 */
