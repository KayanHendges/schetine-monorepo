import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './professional.controller';
import { PrismaService } from '../../providers/db/prisma/prisma.service';
import { RepositoryModule } from '../../repositories/repository.module';
@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IBusinessService',
      useClass: BusinessService,
    },
  ],
  controllers: [BusinessController],
})
export class BusinessModule {}
