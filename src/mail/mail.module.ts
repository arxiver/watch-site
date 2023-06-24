import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
 imports: [
  MailerModule.forRootAsync({
   useFactory: async (config: ConfigService) => ({
    transport: {
     host: config.get('MAIL_HOST'),
     secure: true,
     auth: {
      user: config.get('MAIL_USER'),
      pass: config.get('MAIL_PASS'),
     },
     port: +config.get('MAIL_PORT'),
    },
    defaults: {
     from: `"no-reply" <${config.get('MAIL_USER')}>`,
    },
    template: {
     dir: join(__dirname, 'templates'),
     adapter: new HandlebarsAdapter(),
     options: {
      strict: true,
     },
    },
   }),
   inject: [ConfigService],
  }),
 ],
 providers: [MailService],
 exports: [MailService],
})
export class MailModule {}
