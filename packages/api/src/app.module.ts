import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { ClientModule } from './modules/client/professional.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { MongooseModule } from './providers/db/mongoose/mongoose.module';
import { PrismaModule } from './providers/db/prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    ProfessionalModule,
    BusinessModule,
    ClientModule,
    PrismaModule,
    MongooseModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
