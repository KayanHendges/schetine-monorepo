import { api } from "@providers/api";
import { AxiosResponse } from "axios";

export const listBusinesss = ({
  page = 1,
  pageSize = 20,
  ...params
}: ListBusinessParams): Promise<AxiosResponse<Professional[]>> =>
  api.get<Professional[]>("/business", {
    params: { ...params, page, pageSize },
  });
