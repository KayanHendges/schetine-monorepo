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
    const professional = await this.professionalRepository.find({
      email,
    });

    const passwordMach = bcrypt.compare(professional.password, password);

    if (!passwordMach) throw new Error('Invalid credentials');

    const accessToken = this.jwtService.sign({ id: professional.id });

    return { accessToken };
  }
}
