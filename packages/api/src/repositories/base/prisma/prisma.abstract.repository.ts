import { BaseInterfaceRepository } from '../base.interface.repository';
import { PrismaGenericService } from './types';

export abstract class PrismaAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private prisma: PrismaGenericService<T>;

  protected constructor(prismaServiceRepository: PrismaGenericService<T>) {
    this.prisma = prismaServiceRepository;
  }

  public async create(data: T | any): Promise<T> {
    return await this.prisma.create({ data });
  }
}
