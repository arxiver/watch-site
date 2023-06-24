import { Test, TestingModule } from '@nestjs/testing';
import { SiteReportService } from './site-report.service';

describe('SiteReportService', () => {
 let service: SiteReportService;

 beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
   providers: [SiteReportService],
  }).compile();

  service = module.get<SiteReportService>(SiteReportService);
 });

 it('should be defined', () => {
  expect(service).toBeDefined();
 });
});
