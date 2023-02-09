import { Injectable, Inject } from '@nestjs/common';
import { Business, BusinessProfessional } from '@prisma/client';
import { PrismaService } from '../../../providers/db/prisma/prisma.service';
import { PrismaAbstractRepository } from '../../base/prisma/prisma.abstract.repository';
import {
  IBusinessRepository,
  IListProfessionalAssociations,
} from '../business.repository.interface';

@Injectable()
export class PrismaBusinessRepository
  extends PrismaAbstractRepository<Business>
  implements IBusinessRepository
{
  _prisma: PrismaService;

  constructor(@Inject('PrismaService') prisma: PrismaService) {
    super(prisma.business);
    this._prisma = prisma;
  }

  async listProfessionalAssociations(
    params: IListProfessionalAssociations,
  ): Promise<BusinessProfessional[]> {
    return this._prisma.businessProfessional.findMany({ where: params });
  }

  async associateProfessional(
    businessId: string,
    professionalId: string,
  ): Promise<BusinessProfessional> {
    return this._prisma.businessProfessional.create({
      data: {
        businessId,
        professionalId,
      },
    });
  }

  async diassociateProfessional(
    businessId: string,
    professionalId: string,
  ): Promise<{ count: number }> {
    return this._prisma.businessProfessional.deleteMany({
      where: {
        businessId,
        professionalId,
      },
    });
  }
}
