import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteReportService } from 'src/site-report/site-report.service';
import { Site } from 'src/site/entities/site.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BootloaderService implements OnApplicationBootstrap {

  constructor(@InjectRepository(Site)
  private readonly siteRepository: Repository<Site>,
  private readonly siteReportService: SiteReportService,
  ) { }

  async onApplicationBootstrap() {
    // Call your service method here
    await this.initialize();
  }
  async initialize() {
    const sites = await this.siteRepository.findBy({});
    sites.forEach(async (site) => {
      await this.siteRepository.update(site._id, { ...site, updatedAt: new Date() }
      );
    });
  }
}
