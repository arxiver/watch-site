import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
 constructor(private readonly mailerService: MailerService) {}

 async sendUserConfirmation(user: User, token: string, host: string) {
  const url = `${host}/user/confirm?token=${token}`;

  await this.mailerService.sendMail({
   to: user.email,
   subject: 'Welcome to Watch-site! Confirm your Email',
   template: './confirmation',
   context: {
    // ✏️ filling curly brackets with content
    name: user.name,
    url,
   },
  });
 }

 async sendDownSiteEmail(name:string, email: string, siteName: string, siteUrl: string) {
  return this.mailerService.sendMail({
   to: email,
   subject: '[ALERT] Your site is down!',
   template: './downsite',
   context: {
    // ✏️ filling curly brackets with content
    name: name,
    siteUrl: siteUrl,
    siteName: siteName,
   },
  });
 }

async sendUpSiteEmail(name:string, email: string, siteName: string, siteUrl: string) {
  return this.mailerService.sendMail({
   to: email,
   subject: '[GOOD ALERT] Your site is up again!',
   template: './upsite',
   context: {
    // ✏️ filling curly brackets with content
    name: name,
    siteUrl: siteUrl,
    siteName: siteName,
   },
  });
 }

}