import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProfessionalModule } from '../../modules/professional/professional.module';
import { PrismaService } from './prisma.service';

const prismaClient = new PrismaClient();

@Module({
  imports: [ProfessionalModule],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
  ],
})
export class PrismaModule {}
