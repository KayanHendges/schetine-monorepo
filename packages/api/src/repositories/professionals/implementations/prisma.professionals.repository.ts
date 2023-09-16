import { Injectable, Inject } from '@nestjs/common';
import { Professional } from '@prisma/client';
import { PrismaService } from '../../../providers/db/prisma/prisma.service';
import { PrismaAbstractRepository } from '../../base/prisma/prisma.abstract.repository';
import { IProfessionalRepository } from '../professionals.repository.interface';

@Injectable()
export class PrismaProfessionalsRepository
  extends PrismaAbstractRepository<Professional>
  implements IProfessionalRepository
{
  constructor(@Inject('PrismaService') prisma: PrismaService) {
    super(prisma.professional);
  }
}
