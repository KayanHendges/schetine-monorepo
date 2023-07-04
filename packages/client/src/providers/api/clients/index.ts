import { api } from "@providers/api";

export const listClients = async () =>
  (await api.get<ApiListResponse<Client>>("/client")).data;
