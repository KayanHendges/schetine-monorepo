type OrderBy = "asc" | "desc";

type OrderParam<T> = Record<keyof T, OrderBy>;

interface ApiPagination<T> {
  orderBy?: OrderParam<T>;
  page?: number;
  pageSize?: number;
}

interface ApiListResponse<T> {
  page: number;
  pageSize: number;
  count: number;
  list: T[];
}
