import { LoginDTO } from './auth.dto';

export interface LoginResponse {
  accessToken: string;
}

export interface IAuthService {
  loginProfessional(dto: LoginDTO): Promise<LoginResponse>;
}
