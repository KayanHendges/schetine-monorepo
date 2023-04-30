import {
  TableBodyProps,
  TableHeaderProps,
  TableRootProps,
} from "@components/Tables/Table/types";
import { Text } from "@components/Texts/Text";
import { normalizeDate } from "@utils/formats/date";
import clsx from "clsx";
import _ from "lodash";
import { DateTime, DurationUnit } from "luxon";

function TableRoot({ children, className, ...props }: TableRootProps) {
  return (
    <div className={clsx("flex flex-col flex-1", className)}>{children}</div>
  );
}

TableRoot.displayName = "Table.Root";

function TableHeader<T>({ columns, className, ...props }: TableHeaderProps<T>) {
  return (
    <div
      className={clsx(
        "flex w-full h-12",
        "border-b border-b-gray-600",
        className
      )}
      {...props}
    >
      {columns.map(({ label, className, justify = "center" }) => {
        const key = typeof label === "string" ? label : label.key;
        return (
          <div
            key={key}
            className={clsx(
              `flex flex-1 justify-${justify} items-center truncate`,
              className
            )}
          >
            {typeof label === "string" ? <Text size="md">{label}</Text> : label}
          </div>
        );
      })}
    </div>
  );
}

TableHeader.displayName = "Table.Header";

const handleFormatDate = (
  date: any,
  format = "hh:mm:ss dd/MM/yyyy"
): string => {
  const unitsAgo = (unit: DurationUnit) =>
    Math.abs(Number(dateTime.diffNow(unit)[unit]));

  const dateTime = normalizeDate(date);
  return dateTime.toFormat(format);
};

function TableBody<T>({
  dataSource,
  columns,
  className,
  identifierKey,
  classNameRow,
  ...props
}: TableBodyProps<T>) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col divide-y divide-gray-700",
        className
      )}
      {...props}
    >
      {dataSource?.map((data, rowIndex) => {
        return (
          <div
            key={String(data[identifierKey])}
            className={clsx(
              "flex w-full justify-flex items-center h-16",
              classNameRow
            )}
          >
            {columns.map(
              ({
                dataKey,
                className,
                render,
                label,
                justify = "center",
                dateFormat,
              }) => {
                const labelKey = typeof label === "string" ? label : label.key;
                const key = `${String(data[identifierKey])}-${labelKey}`;

                const dataValue = _.get(data, dataKey, "");
                const valueType = typeof dataValue;
                const value = render
                  ? render(data, rowIndex)
                  : valueType === "string" || valueType === "number"
                  ? String(dataValue)
                  : DateTime.fromJSDate(dataValue as Date).isValid
                  ? handleFormatDate(dataValue, dateFormat)
                  : JSON.stringify(dataValue);

                const children =
                  typeof value !== "string" ? value : <Text>{value}</Text>;

                return (
                  <div
                    key={key}
                    className={clsx(
                      `flex w-full justify-${justify} items-center`,
                      className
                    )}
                  >
                    {children}
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
}

TableBody.displayName = "Table.Body";

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
};
