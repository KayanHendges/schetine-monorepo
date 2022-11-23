import { ListParams } from '../../types';

export interface IBaseRepository<Entity> {
  create(data: Entity): Promise<Entity>;

  find(param: Partial<Entity>): Promise<Entity>;

  list(params: ListParams<Entity>): Promise<Entity[]>;

  count(params: ListParams<Entity>): Promise<number>;

  update(param: Partial<Entity>, data: Partial<Entity>): Promise<Entity>;
}
