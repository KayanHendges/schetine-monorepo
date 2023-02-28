import { DateTime } from "luxon";

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && DateTime.fromISO(value).isValid;
}

export const handleDates = (body: any) => {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = DateTime.fromISO(value).toJSDate();
    else if (typeof value === "object") handleDates(value);
  }
};
