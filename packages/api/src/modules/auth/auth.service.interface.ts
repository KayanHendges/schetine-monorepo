import { Professional } from 'src/entities/professional';
import { GetLoggedProfessionalDTO, LoginDTO } from './auth.dto';

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface IAuthService {
  loginProfessional(payload: LoginDTO): Promise<LoginResponse>;

  getLoggedProfessional(
    params: GetLoggedProfessionalDTO,
  ): Promise<Professional>;
}
