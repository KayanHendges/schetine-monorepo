import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IProfessionalRepository } from '../../repositories/professionals/professionals.repository.interface';
import { LoginDTO } from './auth.dto';
import { IAuthService, LoginResponse } from './auth.service.interface';

export class AuthService implements IAuthService {
  constructor(
    @Inject('IProfessionalRepository')
    private readonly professionalRepository: IProfessionalRepository,
    private jwtService: JwtService,
  ) {}

  async loginProfessional({
    email,
    password,
  }: LoginDTO): Promise<LoginResponse> {
    try {
      const professional = await this.professionalRepository.find({
        email,
      });

      if (!professional) throw new Error('Invalid credentials');

      const passwordMach = bcrypt.compare(professional.password, password);

      if (!passwordMach) throw new Error('Invalid credentials');

      const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 60 * 60 * 24; // 24 hours
      const accessToken = this.jwtService.sign(
        { id: professional.id },
        { expiresIn },
      );

      return { accessToken, expiresIn };
    } catch (error) {
      console.log({ error });
      throw Error(error);
    }
  }
}
