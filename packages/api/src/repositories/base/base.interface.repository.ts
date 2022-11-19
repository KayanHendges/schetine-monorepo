import { ListParams } from '../../types';

export interface IBaseRepository<Entity> {
  create(data: Entity): Promise<Entity>;

  find(unique: Partial<Entity>): Promise<Entity>;

  list(params: ListParams<Entity>): Promise<Entity[]>;

  count(params: ListParams<Entity>): Promise<number>;
}
