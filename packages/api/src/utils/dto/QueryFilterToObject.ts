import {
  WhereBooleanParams,
  WhereDateTimeParams,
  WhereNumberParams,
  WhereParams,
  WhereStringParams,
} from '../../types';

export function queryFilterToObject<T>(
  filter: string,
  type: string,
): WhereParams<T> {
  try {
    const splited = filter.split('_');
    let value: string | number | boolean | Date =
      splited.length === 1 ? splited[0] : splited[1];
    const operator = splited.length === 2 ? splited[0] : null;

    if (type === 'number') value = Number(value);
    if (type === 'boolean') value = Boolean(value);
    if (type === 'date' && typeof value === 'string') value = new Date(value);

    if (operator?.length) {
      if (type === 'string') return { [operator]: value } as WhereStringParams;
      if (type === 'number') return { [operator]: value } as WhereNumberParams;
      if (type === 'boolean')
        return { [operator]: value } as WhereBooleanParams;
      if (type === 'date') return { [operator]: value } as WhereDateTimeParams;
    }

    return value;
  } catch (error) {
    return filter;
  }
}
