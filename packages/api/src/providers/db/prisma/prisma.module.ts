import { Module } from '@nestjs/common';
import { ProfessionalModule } from '../../../modules/professional/professional.module';
import { PrismaService } from './prisma.service';

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
