import { WhereParams } from '../../../types';

interface UniqueParams<T> {
  where: Partial<T>;
}

interface FindManyParams<T> {
  where?: WhereParams<T>;
  orderBy?: OrderParam<T>;
  skip?: number;
  take?: number;
}

interface UpdateOneParams<T> {
  where: WhereParams<T>;
  data: Partial<T>;
}

export interface PrismaGenericService<Entity> {
  create({ data: T }): Promise<Entity>;

  findUnique(param: UniqueParams<Entity>): Promise<Entity | null>;

  findMany(params: FindManyParams<Entity>): Promise<Entity[]>;

  count(params: FindManyParams<Entity>): Promise<number>;

  update(params: UpdateOneParams<Entity>): Promise<Entity>;

  delete(param: UniqueParams): Promise<Entity>;
}
