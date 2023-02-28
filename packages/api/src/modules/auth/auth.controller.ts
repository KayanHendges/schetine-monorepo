import { Body, Controller, Post, Get } from '@nestjs/common';
import { Public } from '../../decorators/public.route.decoratos';
import { AuthService } from './auth.service';
import { GetLoggedProfessionalDTO, LoginDTO } from './auth.dto';
import { CurrentProfessional } from '../../decorators/current.professional.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('auth/professional')
  async getLoggedProfessional(
    @CurrentProfessional() professional: GetLoggedProfessionalDTO,
  ) {
    return this.authService.getLoggedProfessional(professional);
  }

  @Public()
  @Post('login/professional')
  async login(@Body() body: LoginDTO) {
    return this.authService.loginProfessional(body);
  }
}
