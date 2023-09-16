import { createParamDecorator } from '@nestjs/common/decorators';
import { ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../providers/auth/jwt.strategy';

export interface CurrentProfessionalPayload extends JwtPayload {}

export const CurrentProfessional = createParamDecorator(
  (data: undefined, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new Error('Professional not found');

    return user;
  },
);
