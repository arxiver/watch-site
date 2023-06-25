import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SiteReportService } from 'src/site-report/site-report.service';

@Injectable()
export class BootloaderService implements OnApplicationBootstrap {

  constructor(
  private readonly siteReportService: SiteReportService,
  ) { }

  async onApplicationBootstrap() {
    await this.initialize();
  }
  async initialize() {
    await this.siteReportService.bootload();
  }
}
