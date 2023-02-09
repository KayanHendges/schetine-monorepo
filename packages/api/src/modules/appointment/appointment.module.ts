import { Module } from '@nestjs/common';
import { ClientService } from './appointment.service';
import { ClientlController } from './appointment.controller';
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
      provide: 'IClientService',
      useClass: ClientService,
    },
  ],
  controllers: [ClientlController],
})
export class ClientModule {}
