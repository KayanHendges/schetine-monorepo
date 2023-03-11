import { api } from "@providers/api";
import axios, { AxiosResponse } from "axios";

export const getBusiness = async (businessId: string) =>
  (await axios.get<Business>(`business/${businessId}`)).data;

export const listBusinesss = async ({
  page = 1,
  pageSize = 20,
  ...params
}: ListBusinessParams) =>
  (
    await api.get<ApiListResponse<Business>>("/business", {
      params: { ...params, page, pageSize },
    })
  ).data;

export const createBusiness = async (dto: CreateBusinessDTO) =>
  (await axios.post<Business>("business", dto)).data;

export const updateBusiness = async (
  businessId: string,
  dto: CreateBusinessDTO
) => (await axios.patch<Business>(`business/${businessId}`, dto)).data;

export const deleteBusiness = async (businessId: string) =>
  (await axios.delete<Business>(`business/${businessId}`)).data;
