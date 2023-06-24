import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
 @ApiProperty()
 @IsNotEmpty()
 @IsEmail()
 @MaxLength(60)
 email: string;

 @ApiProperty()
 @IsNotEmpty()
 @MaxLength(60)
 password: string;
}
