import { Injectable, Inject } from '@nestjs/common';
import {
  CreateAppointmentDTO,
  DeleteAppointmentParam,
  FindAppointmentDTO,
  ListAppointmentDTO,
  UpdateAppointmentDTO,
  UpdateAppointmentParam,
} from './appointment.dto';
import { IAppointmentService } from './appointment.service.interface';
import { ResponseList } from '../../types';
import { Client } from '../../entities/client';
import { IClientRepository } from '../../repositories/clients/clients.repository.interface';
import { IBusinessRepository } from '../../repositories/business/business.repository.interface';
import { Appointment } from '../../entities/appointment';
import { IAppointmentRepository } from '../../repositories/appointments/appointment.repository.interface';
import { IProfessionalRepository } from '../../repositories/professionals/professionals.repository.interface';

@Injectable()
export class ClientService implements IAppointmentService {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('IBusinessRepository')
    private readonly businessRepository: IBusinessRepository,
    @Inject('IProfessionalRepository')
    private readonly professionalRepository: IProfessionalRepository,
  ) {}
  async create(
    professionalId: string,
    dto: CreateAppointmentDTO,
  ): Promise<Appointment> {
    const associatedBusiness =
      this.businessRepository.listProfessionalAssociations({
        businessId: dto.businessId,
        professionalId,
      });
    const client = this.clientRepository.find({
      id: dto.clientId,
    });

    await Promise.all([associatedBusiness, client]);

    if (!associatedBusiness[0])
      throw new Error(
        "Permission denied. You aren't associated to this business or business not found",
      );

    if (!client) throw new Error('Client not found');

    if ((await client).businessId !== dto.businessId)
      throw new Error(
        'Permission denied. This client is not associated to this business',
      );

    const lastAppointment = await this.appointmentRepository.list({
      where: { businessId: dto.businessId },
      orderBy: { code: 'desc' },
    });

    const code = lastAppointment.length ? lastAppointment[0].code + 1 : 1;

    const appointment = new Appointment({ ...dto, professionalId, code });

    return await this.appointmentRepository.create(appointment);
  }

  async find({ id }: FindAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentRepository.find(id);

    if (!appointment) throw new Error(`Appointment not found`);

    return appointment;
  }

  async list(
    professionalId: string,
    params: ListAppointmentDTO,
  ): Promise<ResponseList<Appointment>> {
    const { page, pageSize, orderBy, ...whereDTO } = params;
    const where = { ...whereDTO, professionalId };
    const repositoryParams = {
      where,
      page,
      pageSize,
      orderBy,
    };

    const count = await this.appointmentRepository.count(where);
    const list = await this.appointmentRepository.list(repositoryParams);

    return { page, pageSize, list, count };
  }

  async update(
    professionalId: string,
    { id }: UpdateAppointmentParam,
    appointment: UpdateAppointmentDTO,
  ): Promise<Appointment> {
    const assignedAppointment = await this.appointmentRepository.find(id);

    if (assignedAppointment.professionalId !== professionalId)
      throw new Error(
        "Permission denied. You aren't assigned to this appointment.",
      );

    const updatedClient = await this.appointmentRepository.update(
      id,
      appointment,
    );

    return updatedClient;
  }

  async delete(
    professionalId: string,
    { id }: DeleteAppointmentParam,
  ): Promise<Appointment> {
    const assignedAppointment = await this.appointmentRepository.find(id);

    if (assignedAppointment.professionalId !== professionalId)
      throw new Error(
        "Permission denied. You aren't assigned to this appointment.",
      );

    const deleted = await this.appointmentRepository.delete(id);

    return deleted;
  }
}
