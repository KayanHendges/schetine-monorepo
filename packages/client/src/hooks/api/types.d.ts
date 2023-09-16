import { FieldValues } from "react-hook-form";

interface UseFetchProps<P = FieldValues> {
  path: string;
  params?: P;
  updateDataState?: boolean;
  lock?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UseFetchReturn<T = any, P = FieldValues> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  exec: (params?: P) => Promise<AxiosResponse<T>>;
}

interface UsePostProps<P, D> extends UseFetchProps<P> {
  data: D;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
interface UsePostReturn<T = any, P = FieldValues, D = FieldValues>
  extends Omit<UseFetchProps<T, D>> {
  data: D;
}
