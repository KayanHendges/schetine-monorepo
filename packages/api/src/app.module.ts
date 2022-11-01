import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { ProfissionalsController } from './modules/profissionals/profissionals.controller';

@Module({
  imports: [ProfessionalsModule],
  controllers: [AppController, ProfissionalsController],
  providers: [AppService],
})
export class AppModule {}
