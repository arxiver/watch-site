import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueFieldValidator } from './user.decorator';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { JWTConfig } from '../../config';

@Module({
 controllers: [UserController],
 imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync(JWTConfig()), MailModule],
 providers: [UserService, UniqueFieldValidator],
 exports: [UserService, TypeOrmModule],
})
export class UserModule {}
