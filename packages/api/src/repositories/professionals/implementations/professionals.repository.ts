import { Professional } from '@prisma/client';
import { PrismaService } from 'src/providers/db/prisma.service';
import { PrismaAbstractRepository } from 'src/repositories/base/prisma/prisma.abstract.repository';
import { ProfessionalsInterfaceRepository } from '../professionals.interface.repository';

export class ProfessionalsRepository
  extends PrismaAbstractRepository<Professional>
  implements ProfessionalsInterfaceRepository
{
  constructor(prisma: PrismaService) {
    super(prisma.professional);
  }
}
