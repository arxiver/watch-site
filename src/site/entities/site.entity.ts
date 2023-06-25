import { Entity, Column, Index, ObjectIdColumn, ObjectId } from 'typeorm';
import {
 IsString,
 IsUrl,
 IsEnum,
 IsOptional,
 IsNumber,
 IsArray,
 ValidateNested,
 IsBoolean,
} from 'class-validator';

export enum Protocol {
 HTTP = 'http',
 HTTPS = 'https',
 TCP = 'tcp',
}

@Entity()
@Index(['url'])
export class Site {
 @ObjectIdColumn({name: '_id'})
 _id: ObjectId;

 @ObjectIdColumn({name: 'userId'})
 userId?: ObjectId;

 @Column()
 @IsString()
 name: string;

 @Column()
 @IsUrl()
 url: string;

 @Column()
 @IsEnum(Protocol)
 protocol: Protocol;

 @Column({ nullable: true })
 @IsOptional()
 @IsString()
 path?: string;

 @Column({ nullable: true })
 @IsOptional()
 @IsNumber()
 port?: number;

 @Column({ nullable: true })
 @IsOptional()
 @IsUrl()
 webhook?: string;

 @Column({ default: 5000 })
 @IsOptional()
 @IsNumber()
 timeout?: number;

 @Column({ default: 10 }) // that attribute is in minutes (only one)
 @IsOptional()
 @IsNumber()
 interval: number;

 @Column({ default: 3 })
 @IsOptional()
 @IsNumber()
 threshold?: number;

 @Column()
 @IsOptional()
 @IsString()
 authUsername?: string;

 @Column()
 @IsString()
 @IsOptional()
 authPassword?: string;

 @Column({ type: 'json', nullable: true })
 @IsOptional()
 @IsArray()
 @ValidateNested({ each: true })
 httpHeaders?: [[string, string]];

 @Column({ default: 200 })
 @IsOptional()
 @IsNumber()
 assertCode?: number;

 @Column({ type: 'array', nullable: true })
 @IsOptional()
 @IsArray()
 @IsString({ each: true })
 tags?: string[];

 @Column({ default: false })
 @IsOptional()
 @IsBoolean()
 ignoreSSL?: boolean;

 @Column({ default: false })
 @IsOptional()
 @IsBoolean()
 deleted?: boolean;

 @Column()
 @IsOptional()
 @IsNumber()
 createdAt?: number | Date;

 @Column()
 @IsOptional()
 @IsNumber()
 updatedAt?: number | Date;

 @ObjectIdColumn({name: 'reportId'})
 reportId?: ObjectId;
}
