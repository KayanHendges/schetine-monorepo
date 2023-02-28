import { AxiosRequestConfig } from "axios";

interface UseFetchProps<P = Record<string, any>> {
  path: string;
  params?: P;
  updateDataState?: boolean;
  lock?: boolean;
}

interface UseFetchReturn<T = any, P = Record<string, any>> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  exec: (params?: P) => Promise<AxiosResponse<T>>;
}

interface UsePostProps<P, D> extends UseFetchProps<P> {
  data: D;
}

interface UsePostReturn<
  T = any,
  P = Record<string, any>,
  D = Record<string, any>
> extends Omit<UseFetchProps<T, D>> {
  data: D;
}
