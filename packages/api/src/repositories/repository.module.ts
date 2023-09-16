import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from '../providers/db/mongoose/schema/appointments.schema';
import { PrismaService } from '../providers/db/prisma/prisma.service';
import { MongoAppointmentRepository } from './appointments/implementations/mongo.appointment.repository';
import { PrismaBusinessRepository } from './business/implementations/prisma.business.repository';
import { PrismaClientsRepository } from './clients/implementations/prisma.clients.repository';
import { PrismaProfessionalsRepository } from './professionals/implementations/prisma.professionals.repository';
import { PrismaAuthRepository } from './auth/implementations/prisma.auth.repository';

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
      provide: 'IAuthRepository',
      useClass: PrismaAuthRepository,
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
    'IAuthRepository',
  ],
})
export class RepositoryModule {}
