import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsEnum, IsOptional, IsNumber, IsArray, IsBoolean, Min } from 'class-validator';
import { ObjectId } from 'typeorm';
import { Protocol } from '../entities/site.entity';
export class CreateSiteDto {
 userId?: ObjectId;

 @ApiProperty({ example: 'My website', description: 'The name of the check.' })
 @IsString()
 name: string;

 @ApiProperty({
  example: 'https://www.google.com',
  description: 'The URL to be monitored.',
 })
 @IsUrl()
 url: string;

 @ApiProperty({
  enum: Protocol,
  example: Protocol.HTTP,
  description: 'The resource protocol name.',
 })
 @IsEnum(Protocol)
 protocol: Protocol;

 @ApiProperty({
  example: '/health-check',
  description: 'A specific path to be monitored.',
 })
 @IsOptional()
 @IsString()
 path?: string;

 @ApiProperty({ example: 80, description: 'The server port number.' })
 @IsOptional()
 @IsNumber()
 port?: number;

 @ApiProperty({
  example: 'https://mywebhook.com',
  description: 'A webhook URL to receive a notification on.',
 })
 @IsOptional()
 @IsUrl()
 webhook?: string;

 @ApiProperty({
  example: 5000,
  description: 'The timeout of the polling request.',
 })
 @IsOptional()
 @IsNumber()
 timeout?: number;

 @ApiProperty({
  example: 5,
  description: 'The time interval (minutes) for polling requests. (min: 5 mins)',
 })
 @IsOptional()
//  @Min(5)
// @Max(100)
 @IsNumber()
 interval?: number;

 @ApiProperty({
  example: 3,
  description: 'The threshold of failed requests that will create an alert.',
 })
 @IsOptional()
 @IsNumber()
 threshold?: number;

 @ApiProperty({ type: 'string', description: 'The authentication username.' })
 @IsOptional()
 @IsString()
 authUsername?: string;

 @ApiProperty({ type: 'string', description: 'The authentication password.' })
 @IsOptional()
 @IsString()
 authPassword?: string;

 @ApiProperty({
  example: [
   ['Content-Type', 'application/json'],
   ['Authorization', 'Bearer token'],
  ],
 })
 @IsArray()
 @IsOptional()
 httpHeaders?: [[string, string]];

 @ApiProperty({
  type: 'number',
  description: 'The response assertion to be used on the polling response.',
 })
 @IsOptional()
 @IsNumber()
 assertCode?: number;

 @ApiProperty({
  example: ['tag1', 'tag2'],
  description: 'A list of the check tags.',
 })
 @IsOptional()
 @IsArray()
 @IsString({ each: true })
 tags?: string[];

 @ApiProperty({
  example: true,
  description: 'A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol.',
 })
 @IsOptional()
 @IsBoolean()
 ignoreSSL?: boolean;
}
