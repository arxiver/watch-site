import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { toObjectId } from 'src/utils';

// Custom validator to check if a field is unique
@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueFieldValidator implements ValidatorConstraintInterface {
 constructor(private readonly userService: UserService) {}

 validate = async (value: any, args: ValidationArguments): Promise<boolean> => {
  const fieldName = args.constraints[1];
  const entity = await this.userService.findOneByProp(fieldName, value);
  return !entity;
 };

 defaultMessage(args: ValidationArguments) {
  const fieldName = args.constraints[1];
  return `${fieldName} must be unique`;
 }
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
 const request = ctx.switchToHttp().getRequest();
 if (!request?.user?.sub) {
  throw new UnauthorizedException();
 } else {
  return toObjectId(request.user.sub);
 }
});
