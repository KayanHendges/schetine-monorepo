import { ListParams } from '../../types';

export interface IBaseRepository<Entity> {
  create(data: Omit<Entity, 'modified' | 'created'>): Promise<Entity>;

  find(param: Partial<Entity>): Promise<Entity | null>;

  list(params: ListParams<Entity>): Promise<Entity[]>;

  count(params: ListParams<Entity>): Promise<number>;

  update(param: Partial<Entity>, data: Partial<Entity>): Promise<Entity>;

  delete(param: Partial<Entity>): Promise<Entity>;
}
