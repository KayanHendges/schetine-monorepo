import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientlController } from './client.controller';
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
      provide: 'IClientService',
      useClass: ClientService,
    },
  ],
  controllers: [ClientlController],
})
export class ClientModule {}
