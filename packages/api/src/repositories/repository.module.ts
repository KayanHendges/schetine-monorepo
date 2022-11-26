import { Module } from '@nestjs/common';
import { PrismaService } from '../providers/db/prisma.service';
import { PrismaBusinessRepository } from './business/implementations/prisma.business.repository';
import { PrismaProfessionalsRepository } from './professionals/implementations/prisma.professionals.repository';

@Module({
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IProfessionalRepository',
      useClass: PrismaProfessionalsRepository,
    },
    {
      provide: 'IBusinessRepository',
      useClass: PrismaBusinessRepository,
    },
  ],
  exports: ['PrismaService', 'IProfessionalRepository', 'IBusinessRepository'],
})
export class RepositoryModule {}
