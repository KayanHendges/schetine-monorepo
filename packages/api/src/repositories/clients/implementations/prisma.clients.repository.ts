import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from '../../../providers/db/prisma/prisma.service';
import { PrismaAbstractRepository } from '../../base/prisma/prisma.abstract.repository';
import { IClientRepository } from '../clients.repository.interface';

@Injectable()
export class PrismaClientsRepository
  extends PrismaAbstractRepository<Client>
  implements IClientRepository
{
  constructor(@Inject('PrismaService') prisma: PrismaService) {
    super(prisma.client);
  }
}
