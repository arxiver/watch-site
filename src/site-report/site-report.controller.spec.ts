import { Test, TestingModule } from '@nestjs/testing';
import { SiteReportController } from './site-report.controller';
import { SiteReportService } from './site-report.service';

describe('SiteReportController', () => {
 let controller: SiteReportController;

 beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
   controllers: [SiteReportController],
   providers: [SiteReportService],
  }).compile();

  controller = module.get<SiteReportController>(SiteReportController);
 });

 it('should be defined', () => {
  expect(controller).toBeDefined();
 });
});
