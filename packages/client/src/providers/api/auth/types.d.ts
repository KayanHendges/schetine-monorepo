interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

interface AuthPayload {
  accessToken: string;
  expiresIn: number;
}
