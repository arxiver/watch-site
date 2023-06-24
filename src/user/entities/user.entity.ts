import { Entity, Column, Unique, ObjectId, ObjectIdColumn } from 'typeorm';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
 @ObjectIdColumn()
 _id: ObjectId;

 @Column()
 @IsNotEmpty()
 name: string;

 @Column()
 @IsNotEmpty()
 @IsEmail()
 @Unique(['email'])
 email: string;

 @Column({ select: false })
 @IsNotEmpty()
 password: string;

 @Column({ nullable: true })
 confirmed: boolean;
 // write for mongodb
 @Column({
  select: false,
  type: 'timestamp',
  default: () => 'CURRENT_TIMESTAMP',
 })
 createdAt: Date;

 @Column({
  select: false,
  type: 'timestamp',
  default: () => 'CURRENT_TIMESTAMP',
 })
 updatedAt: Date;

 @Column()
 @IsArray()
 sites: ObjectId[];
}
