import { api } from "@providers/api";
import { AxiosResponse } from "axios";
import { parseCookies } from "nookies";

api.interceptors.request.use((success) => {
  const { "auth.token": token } = parseCookies();

  if (success.headers && token)
    Object.assign(success.headers, { Authorization: `Bearer ${token}` });

  return success;
});

export const loginProfessional = async (
  params: LoginPayload
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post<LoginResponse>("login/professional", params);
};

export const getLoggedPofessional = (): Promise<AxiosResponse<Professional>> =>
  api.get<Professional>("auth/professional");
