import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UniqueFieldValidator } from './user.decorator';
import { AppModule } from '../app.module';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';

describe('UserService', () => {
 let service: UserService;

 beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
   imports: [
    ConfigModule.forRoot({
     envFilePath: `${process.cwd()}/config/env/dev.env`,
    }),
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: process.env.TESTDB_POSTGRES_HOST,
     port: +process.env.TESTDB_POSTGRES_PORT,
     username: process.env.TESTDB_POSTGRES_USER,
     password: process.env.TESTDB_POSTGRES_PASSWORD,
     database: process.env.TESTDB_POSTGRES_DB,
     entities: [User],
     synchronize: true,
    }),
    JwtModule.register({
     global: true,
     secret: process.env.JWT_SECRET,
     secretOrKeyProvider: () => process.env.JWT_SECRET,
     signOptions: { expiresIn: '1h' },
    }),
    AppModule,
    UserModule,
   ],
   providers: [UserService, UniqueFieldValidator],
  }).compile();

  service = module.get<UserService>(UserService);
 });
 it('should be defined', () => {
  expect(service).toBeDefined();
  expect(1).toEqual(1);
 });

 afterAll(async () => {
  // Clean up the database
 });
});
