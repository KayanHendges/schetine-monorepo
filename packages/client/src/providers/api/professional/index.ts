import { useFetch } from "@hooks/api/useFetch";
import { api } from "@providers/api";
import { AxiosResponse } from "axios";

export const findProfessional = async ({
  id,
  username,
  email,
}: FindProfessionalParams): Promise<AxiosResponse<Professional>> =>
  api.get<Professional>(`/professional/${id || email || username}`);

export const useFindProfessional = (params?: FindProfessionalParams) =>
  useFetch<Professional, FindProfessionalParams>({
    path: "/professionals",
    lock: !params,
    params,
  });

export const registerProfessional = async (
  payload: RegisterProfessionalPayload
): Promise<AxiosResponse<Professional>> =>
  api.post<Professional>("/professional", payload);
