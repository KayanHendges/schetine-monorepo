import { UseFetchProps, UseFetchReturn } from "@hooks/api/types";
import { api } from "@providers/api";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch<T = any, P = Record<string, any>>({
  path,
  params = {},
  updateDataState = true,
  lock = false,
}: UseFetchProps): UseFetchReturn<T, P> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const exec = useCallback(
    (execParams: P) =>
      new Promise<AxiosResponse<T>>(async (resolve, reject) => {
        setIsLoading(true);
        return api
          .get<T>(path, { params: execParams })
          .then(resolve)
          .catch(reject)
          .finally(() => setIsLoading(false));
      }),
    [path]
  );

  useEffect(() => {
    !lock &&
      updateDataState &&
      exec(params as P)
        .then(({ data }) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(Error(err));
        });
  }, [exec, lock, params, updateDataState]);

  return { isLoading, data, error, exec };
}
