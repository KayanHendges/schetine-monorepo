import { IBaseRepository } from '../base.interface.repository';
import { PrismaGenericService } from './types';

export abstract class PrismaAbstractRepository<T>
  implements IBaseRepository<T>
{
  private prisma: PrismaGenericService<T>;

  protected constructor(prismaServiceRepository: PrismaGenericService<T>) {
    this.prisma = prismaServiceRepository;
  }

  public async create(data: T | any): Promise<T> {
    // console.log(this.prisma);
    return await this.prisma.create({ data });
  }
}
