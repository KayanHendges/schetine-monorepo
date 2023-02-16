import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from '../providers/db/mongoose/schema/appointments.schema';
import { PrismaService } from '../providers/db/prisma/prisma.service';
import { MongoAppointmentRepository } from './appointments/implementations/mongo.appointment.repository';
import { PrismaBusinessRepository } from './business/implementations/prisma.business.repository';
import { PrismaClientsRepository } from './clients/implementations/prisma.clients.repository';
import { PrismaProfessionalsRepository } from './professionals/implementations/prisma.professionals.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Appointment',
        schema: AppointmentSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IProfessionalRepository',
      useClass: PrismaProfessionalsRepository,
    },
    {
      provide: 'IBusinessRepository',
      useClass: PrismaBusinessRepository,
    },
    {
      provide: 'IClientRepository',
      useClass: PrismaClientsRepository,
    },
    {
      provide: 'IAppointmentRepository',
      useClass: MongoAppointmentRepository,
    },
  ],
  exports: [
    'PrismaService',
    'IProfessionalRepository',
    'IBusinessRepository',
    'IClientRepository',
    'IAppointmentRepository',
  ],
})
export class RepositoryModule {}
