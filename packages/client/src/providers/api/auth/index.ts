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
): Promise<LoginResponse> =>
  (await api.post<LoginResponse>("login/professional", params)).data;

export const getLoggedPofessional = async (): Promise<Professional> =>
  (await api.get<Professional>("auth/professional")).data;
