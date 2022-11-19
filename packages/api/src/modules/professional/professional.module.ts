import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { PrismaService } from '../../providers/db/prisma.service';
import { RepositoryModule } from '../../repositories/repository.module';
@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IProfessionalService',
      useClass: ProfessionalService,
    },
  ],
  controllers: [ProfessionalController],
})
export class ProfessionalModule {}
