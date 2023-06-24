import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigModule } from '@nestjs/config';
import { UniqueFieldValidator } from './user.decorator';
import { JwtModule } from '@nestjs/jwt';
import { AppModule } from '../app.module';
import { UserModule } from './user.module';
import { LoginUserDto } from './dto/login-user.dto';

describe('UserController', () => {
 let controller: UserController;
 let repository: Repository<User>;

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
   controllers: [UserController],
   providers: [UserService, UniqueFieldValidator],
  }).compile();

  controller = module.get<UserController>(UserController);
  repository = module.get<Repository<User>>('UserRepository');
 });

 afterAll(async () => {
  await repository.query('DELETE FROM "user"');
 });

 describe('methods', () => {
  it('should create a new user', async () => {
   const createUserDto: CreateUserDto = {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: 'password00',
   };

   const result = await controller.create(createUserDto);

   expect(result.message).toEqual('Signup successful');
  });

  it('should throw an error if the email is already in use', async () => {
   const createUserDto: CreateUserDto = {
    name: 'John Smith',
    email: 'johndoe@example.com',
    password: 'password00',
   };
   try {
    await controller.create(createUserDto);
   } catch (error) {
    expect(error.message).toContain('duplicate key value violates unique constraint');
   }
  }, 10000);

  it('missing email', async () => {
   const createUserDto: CreateUserDto = {
    name: 'John Smith',
    email: '',
    password: 'password00',
   };
   try {
    await controller.create(createUserDto);
   } catch (error) {
    expect(error.message).toContain('email must be an email');
   }
  }, 10000);

  it('login test with correct credentials', async () => {
   const loginUserDto: LoginUserDto = {
    email: 'janedoe@example.com',
    password: 'password00',
   };
   const result = await controller.login(loginUserDto);
   expect(result).toHaveProperty('access_token');
  }, 10000);

  it('login test invalid credentials', async () => {
   const loginUserDto: LoginUserDto = {
    email: 'blabla@gmail.com',
    password: 'password00',
   };
   try {
    await controller.login(loginUserDto);
   } catch (error) {
    expect(error.message).toContain('Invalid credentials');
   }
  }, 10000);

  it('get all users data', async () => {
   const loginUserDto: LoginUserDto = {
    email: 'janedoe@example.com',
    password: 'password00',
   };
   const result = await controller.login(loginUserDto);
   expect(result).toHaveProperty('access_token');
   const users = await controller.findAll();
   expect(users.length).not.toEqual(0);
  }, 10000);

  it('get user with id equals to the logged in', async () => {
   const loginUserDto: LoginUserDto = {
    email: 'janedoe@example.com',
    password: 'password00',
   };
   const result = await controller.login(loginUserDto);
   expect(result).toHaveProperty('access_token');
   const user = await controller.findOne(result.id);
   expect(user.name).toEqual('Jane Doe');
  }, 10000);
 });
});
