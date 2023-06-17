import { ListParams } from '../../types';

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export interface IBaseRepository<Entity> {
  create(data: Omit<Entity, 'modified' | 'created'>): Promise<Entity>;

  find(param: Partial<Entity>): Promise<Entity | null>;

  list(params: ListParams<Entity>): Promise<Entity[]>;

  count(params: ListParams<Entity>): Promise<number>;

  update(param: RequireOnlyOne<Entity>, data: Partial<Entity>): Promise<Entity>;

  delete(param: Partial<Entity>): Promise<Entity>;
}
