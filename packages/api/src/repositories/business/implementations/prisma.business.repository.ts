import { Injectable, Inject } from '@nestjs/common';
import { Business } from '@prisma/client';
import { PrismaService } from '../../../providers/db/prisma.service';
import { PrismaAbstractRepository } from '../../base/prisma/prisma.abstract.repository';
import { IBusinessRepository } from '../business.repository.interface';

@Injectable()
export class PrismaBusinessRepository
  extends PrismaAbstractRepository<Business>
  implements IBusinessRepository
{
  constructor(@Inject('PrismaService') prisma: PrismaService) {
    super(prisma.business);
  }
}
