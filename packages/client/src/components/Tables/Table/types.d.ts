import { HTMLAttributes } from "react";
import { NestedKeyOf } from "types";

interface TableColum<T> {
  dataKey?: NestedKeyOf<T>;
  label: JSX.Element | string;
  render?: (value: T, rowIndex: number) => JSX.Element | string | number | undefined;
  width?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  dateFormat?: string;
}

interface TableRootProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[];
}

interface TableHeaderProps<T> extends HTMLAttributes<HTMLDivElement> {
  columns: TableColum<T>[];
}

interface TableBodyProps<T> extends HTMLAttributes<HTMLDivElement> {
  columns: TableColum<T>[];
  identifierKey: keyof T;
  dataSource: T[];
  classNameRow?: HTMLAttributes<HTMLDivElement>["className"];
}
