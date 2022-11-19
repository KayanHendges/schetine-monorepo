interface WhereDefaultParams<T> {
  in?: T[];
  notIn?: T[];
  lt?: T;
  lte?: T;
  gt?: T;
  gte?: T;
  not?: T;
}

interface WhereStringParams extends WhereDefaultParams<string> {
  constains?: string;
  startsWith?: string;
  endsWidth?: string;
}

interface WhereNumberParams extends WhereDefaultParams<number> {}

interface WhereDateTimeParams extends WhereDefaultParams<Date> {}

interface WhereBooleanParams extends Pick<WhereDefaultParams<boolean>, 'not'> {}

export type WhereParams<T> = {
  [P in keyof T]?:
    | typeof P
    | (P extends number
        ? WhereDefaultParams<number>
        : P extends string
        ? WhereStringParams
        : P extends Date
        ? WhereBooleanParams
        : P extends boolean
        ? WhereBooleanParams
        : never);
};

interface OrderParam<T> extends Record<keyof T, 'asc' | 'desc'> {}

interface ListParams<T> {
  where?: WhereParams<T>;
  orderBy?: OrderParam<T>;
  page?: number;
  pageLimit?: number;
}

interface RepositoryList<T> {
  count: number;
  list: T[];
}

interface ListResponse<T> extends RepositoryList<T> {
  page: number;
  pageLimit: number;
}
