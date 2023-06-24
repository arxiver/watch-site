import { PartialType } from '@nestjs/swagger';
import { CreateSiteReportDto } from './create-site-report.dto';

export class UpdateSiteReportDto extends PartialType(CreateSiteReportDto) {}
