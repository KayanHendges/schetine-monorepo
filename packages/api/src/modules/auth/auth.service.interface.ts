import { LoginDTO } from './auth.dto';

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface IAuthService {
  loginProfessional(dto: LoginDTO): Promise<LoginResponse>;
}
