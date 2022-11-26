import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './modules/business/business.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { PrismaModule } from './providers/db/prisma.module';

@Module({
  imports: [ProfessionalModule, BusinessModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
