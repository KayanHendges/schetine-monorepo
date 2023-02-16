import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { RepositoryModule } from '../../repositories/repository.module';
import { AppointmentService } from './appointment.service';
@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: 'IAppointmentService',
      useClass: AppointmentService,
    },
  ],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
