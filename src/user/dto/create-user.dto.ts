import { IsEmail, IsNotEmpty, Length, MaxLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueFieldValidator } from '../user.decorator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
 @ApiProperty()
 @Length(3, 30)
 @IsNotEmpty()
 name: string;

 @ApiProperty()
 @IsNotEmpty()
 @IsEmail()
 @MaxLength(60)
 @Validate(UniqueFieldValidator, [User, 'email'])
 email: string;

 @ApiProperty()
 @IsNotEmpty()
 @Length(8, 30)
 password: string;
}
