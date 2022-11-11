import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessionalModule } from './modules/professional/professional.module';
import { PrismaModule } from './providers/db/prisma.module';

@Module({
  imports: [ProfessionalModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
