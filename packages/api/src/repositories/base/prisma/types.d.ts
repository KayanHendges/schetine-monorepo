export interface PrismaGenericService<T> {
  create({ data: T }): Promise<T>;
}
