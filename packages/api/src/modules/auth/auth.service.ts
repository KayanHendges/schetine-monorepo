import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IProfessionalRepository } from '../../repositories/professionals/professionals.repository.interface';
import { GetLoggedProfessionalDTO, LoginDTO } from './auth.dto';
import { IAuthService, LoginResponse } from './auth.service.interface';
import { Professional } from 'src/entities/professional';

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

      const passwordMatch = await bcrypt.compare(
        professional.password,
        password,
      );

      if (!passwordMatch) throw new Error('Invalid credentials');

      const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 60 * 60 * 24; // 24 hours
      const accessToken = this.jwtService.sign(
        { id: professional.id },
        { expiresIn },
      );

      return { accessToken, expiresIn };
    } catch (error) {
      throw Error(error);
    }
  }

  async getLoggedProfessional({
    id,
  }: GetLoggedProfessionalDTO): Promise<Professional> {
    const { password, ...professional } =
      await this.professionalRepository.find({ id });

    if (!professional) throw new Error('Professional not found.');

    return professional;
  }
}
