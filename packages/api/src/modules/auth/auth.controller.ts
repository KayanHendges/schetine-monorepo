import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../decorators/public.route.decoratos';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login/professional')
  async login(@Body() body: LoginDTO) {
    return this.authService.loginProfessional(body);
  }
}
