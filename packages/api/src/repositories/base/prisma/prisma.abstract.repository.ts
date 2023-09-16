import { ListParams } from '../../../types';
import { IBaseRepository } from '../base.interface.repository';
import { PrismaGenericService } from './types';

export abstract class PrismaAbstractRepository<T>
  implements IBaseRepository<T>
{
  private prisma: PrismaGenericService<T>;

  protected constructor(prismaServiceRepository: PrismaGenericService<T>) {
    this.prisma = prismaServiceRepository;
  }

  public async create(data: Omit<T, 'modified' | 'created'>): Promise<T> {
    return this.prisma.create({ data });
  }

  public async find(where: Partial<T>): Promise<T> {
    return this.prisma.findUnique({ where });
  }

  public async list({
    where,
    orderBy,
    page,
    pageSize,
  }: ListParams<T>): Promise<T[]> {
    const take = pageSize ? pageSize : undefined;
    const skip = page && take ? (page - 1) * take : undefined;
    return this.prisma.findMany({
      where,
      orderBy,
      take,
      skip,
    });
  }

  public async count({
    where,
    orderBy,
    page,
    pageSize,
  }: ListParams<T>): Promise<number> {
    const take = pageSize ? pageSize : undefined;
    const skip = page && take ? (page - 1) * take : undefined;
    return this.prisma.count({
      where,
      orderBy,
      take,
      skip,
    });
  }

  public update(where: Partial<T>, data: Partial<T>): Promise<T> {
    return this.prisma.update({ where, data });
  }

  public delete(where: Partial<T>): Promise<T> {
    return this.prisma.delete({ where });
  }
}
