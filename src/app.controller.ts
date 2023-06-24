import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
 constructor(private readonly appService: AppService) {}
 // Redirect to /api [Swagger UI]
 @Get()
 @ApiExcludeEndpoint()
 @Redirect('/api')
 getAPI() {
  return;
 }

 // Health check
 @Get('health')
 getHealth(): string {
  return this.appService.getHealth();
 }
}
