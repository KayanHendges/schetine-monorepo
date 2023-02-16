import { Appointment } from '../../providers/db/mongoose/schema/appointments.schema';
import { ListParams, WhereParams } from '../../types';

export interface AppointmentRepository extends Appointment {
  id: string;
}

export interface CreateAppointmentPayload {
  id: string;
  businessId: string;
  professionalId: string;
  clientId: string;
  price: number;
  start: Date;
  end: Date;
}

export interface UpdateAppointmentPayload
  extends Partial<AppointmentRepository> {}

export interface IAppointmentRepository {
  generateId(): Promise<string>;

  create(appointment: CreateAppointmentPayload): Promise<AppointmentRepository>;

  find(appointmentId: string): Promise<AppointmentRepository | null>;

  list(
    params: ListParams<AppointmentRepository>,
  ): Promise<AppointmentRepository[]>;

  count(params: WhereParams<AppointmentRepository>): Promise<number>;

  update(
    appointmentId: string,
    appointment: UpdateAppointmentPayload,
  ): Promise<AppointmentRepository>;

  delete(appointmentId): Promise<AppointmentRepository>;
}
