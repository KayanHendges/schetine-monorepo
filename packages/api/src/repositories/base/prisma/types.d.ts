interface FindUniqueParams<T> {
  where: Partial<T>;
}

interface FindManyParams<T> {
  where?: WhereParams<T>;
  orderBy?: OrderParam<T>;
  skip?: number;
  take?: number;
}

export interface PrismaGenericService<Entity> {
  create({ data: T }): Promise<Entity>;

  findUnique(params: FindUniqueParams<Entity>): Promise<Entity>;

  findMany(params: FindManyParams<Entity>): Promise<Entity[]>;

  count(params: FindManyParams<Entity>): Promise<number>;
}
