import { api } from "@providers/api";
import { parseCookies } from "nookies";

api.interceptors.request.use((success) => {
  const { "auth.token": token } = parseCookies();

  if (success.headers && token)
    Object.assign(success.headers, { Authorization: `Bearer ${token}` });

  return success;
});

export const loginProfessional = (params: LoginParams) => {
  return api.post<LoginResponse>("login/professional", params);
};
