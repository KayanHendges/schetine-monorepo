import { Appointment } from '../../entities/appointment';
import { ResponseList } from '../../types';
import {
  CreateAppointmentDTO,
  DeleteAppointmentParam,
  FindAppointmentDTO,
  ListAppointmentDTO,
  UpdateAppointmentDTO,
  UpdateAppointmentParam,
} from '../appointment/appointment.dto';

export interface IAppointmentService {
  create(
    professionalId: string,
    appointment: CreateAppointmentDTO,
  ): Promise<Appointment>;

  find(params: FindAppointmentDTO): Promise<Appointment>;

  list(
    professionalId: string,
    params: ListAppointmentDTO,
  ): Promise<ResponseList<Appointment>>;

  update(
    professionalId: string,
    uniqueParam: UpdateAppointmentParam,
    appointment: UpdateAppointmentDTO,
  ): Promise<Appointment>;

  delete(
    professionalId: string,
    params: DeleteAppointmentParam,
  ): Promise<Appointment>;
}
