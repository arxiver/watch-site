import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { hashPassword, comparePasswordHash, toObjectId } from '../utils';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
 constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private readonly jwtService: JwtService,
  private readonly mailService: MailService,
 ) {}

 /** Creates a new user
  *
  * @param string $name The name of the user
  * @param string $email The email of the user
  * @param string $password The password of the user
  *
  * @return User The user
  *
  */
 async create(createUserDto: CreateUserDto) {
  // Create the user instance
  const user = this.userRepository.create(createUserDto);

  // Hash the password
  user.password = await hashPassword(user.password);

  // Save the user
  const savedUser = await this.userRepository.save(user);

  // Create access token
  this._sendConfirmationEmail(savedUser, process.env.HOST || 'http://localhost:3000');
  return await this._createToken(savedUser, 'Signup successful');
 }

 findAll() {
  return this.userRepository.find();
 }

 /** Finds a user by id
  *
  * @param number $id The id of the user
  *
  * @return User The user
  *
  */
 findOne(id: ObjectId) {
  return this.userRepository.findOneBy({ _id: id });
 }

 /** Finds a user by a property
  *
  * @param string $prop The property to find by
  * @param any $value The value to find by
  *
  * @return User The user
  *
  */
 findOneByProp(prop: any, value: any) {
  return this.userRepository.findOneBy({ [prop]: value });
 }

 /**
  *
  *      .o.                       .   oooo
  *     .888.                    .o8   `888
  *    .8"888.     oooo  oooo  .o888oo  888 .oo.
  *   .8' `888.    `888  `888    888    888P"Y88b
  *  .88ooo8888.    888   888    888    888   888
  * .8'     `888.   888   888    888 .  888   888
  * o88o     o8888o  `V88V"V8P'   "888" o888o o888o
  *
  * */

 /** Logs in a user
  *
  * @param string $email The email of the user
  * @param string $password The password of the user
  *
  * @throws HTTPErrors\UnauthorizedException if the credentials are invalid
  *
  * @return string The access token for the user
  *
  *
  */
 async login(loginUser: LoginUserDto) {
  const user = await this._findUserWithPassByEmail(loginUser.email);
  if (!user) {
   throw new HttpException('Invalid credentials', 401);
  }
  if ((await comparePasswordHash(loginUser.password, user.password)) === false) {
   throw new HttpException('Invalid credentials', 401);
  }
  return await this._createToken(user);
 }

 /** Validates a user by JWT
  *
  * @param string $payload The payload of the JWT
  *
  * @throws HTTPErrors\UnauthorizedException if the user is not found
  *
  *  @return User The user
  *
  */
 async validateUserByJwt(payload: any) {
  const user = await this.findOneByProp('email', payload.email);
  if (!user) {
   throw new UnauthorizedException();
  }
  return user;
 }

 // Red flag: this function returns the user's password hash
 // Utility function to find a user by email and password is returned
 private _findUserWithPassByEmail(email: string) {
  return this.userRepository.findOne({
   where: { email: email },
   select: ['_id', 'email', 'password'],
  });
 }

 // Utility function to create a token
 private async _createToken(user: User, message = 'Login successful') {
  const payload = { sub: user._id, email: user.email };
  return {
   message: message,
   id: user._id,
   access_token: await this.jwtService.signAsync(payload),
  };
 }

 private async _sendConfirmationEmail(user: User, host: string) {
  const token = await this.jwtService.signAsync({ sub: user._id });
  await this.mailService.sendUserConfirmation(user, token, host);
 }

 /** Confirms a user
  *
  * @param string $token The token of the user
  *
  * @throws HTTPErrors\UnauthorizedException if the token is invalid
  *
  *
  *
  * @return User The user
  *
  */
 async confirm(token: string) {
  try {
   const payload = await this.jwtService.verifyAsync(token);
   console.log(payload);
   const user = await this.findOne(toObjectId(payload.sub));
   if (!user) {
    throw new UnauthorizedException();
   }
   if (user.confirmed) {
    return { message: 'User already confirmed' };
   }
   user.confirmed = true;
   await this.userRepository.save(user);
   return { message: 'User confirmed' };
  } catch (e) {
   throw new HttpException('Invalid token', 401);
  }
 }
}
