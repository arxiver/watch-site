import { CanActivate, ExecutionContext, Global, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ObjectId } from 'typeorm';
import { toObjectId } from './utils';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private jwtService: JwtService) {}
 async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  const jwtSecret = process.env.JWT_SECRET;
  const token = this.extractTokenFromHeader(request);
  if (!token) {
   throw new UnauthorizedException();
  }
  try {
   const payload = await this.jwtService.verifyAsync(token, {
    secret: jwtSecret,
   });
   // 💡 We're assigning the payload to the request object here
   // so that we can access it in our route handlers
   request['user'] = payload;
  } catch (e) {
   throw new UnauthorizedException();
  }
  return true;
 }

 private extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = (request.headers.authorization as string)?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
 }

 public static async getUserId(context: ExecutionContext): Promise<ObjectId> {
  const userId = (await context.switchToHttp().getRequest())['user'].sub;
  return toObjectId(userId);
 }
}
