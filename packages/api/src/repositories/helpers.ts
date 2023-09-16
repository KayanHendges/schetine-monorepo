export const formatIncludeArray = <T extends string>(
  keys: T[],
): Partial<Record<T, boolean>> =>
  [...new Set(keys)].reduce((prev, cur) => ({ ...prev, [cur]: true }), {});
