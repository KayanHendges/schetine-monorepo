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

  public async create(data: T): Promise<T> {
    return await this.prisma.create({ data });
  }

  public async find(unique: Partial<T>): Promise<T> {
    return await this.prisma.findUnique({ where: unique });
  }

  public async list({
    where,
    orderBy,
    page,
    pageSize,
  }: ListParams<T>): Promise<T[]> {
    const take = pageSize ? pageSize : undefined;
    const skip = page && take ? (page - 1) * take : undefined;
    return await this.prisma.findMany({
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
    return await this.prisma.count({
      where,
      orderBy,
      take,
      skip,
    });
  }
}
