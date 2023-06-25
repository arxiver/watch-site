import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SearchSiteReportDto {
  @ApiProperty({type: [String], description: 'Tags to search for'})
  @IsArray()
  tags: string[];
}
