import { Module } from '@nestjs/common';
import { PrismaService } from '../providers/db/prisma.service';
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
  ],
  exports: ['PrismaService', 'IProfessionalRepository'],
})
export class RepositoryModule {}
