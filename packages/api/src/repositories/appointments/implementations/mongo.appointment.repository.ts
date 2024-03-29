import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, SortOrder } from 'mongoose';
import {
  Appointment,
  AppointmentDocument,
} from '../../../providers/db/mongoose/schema/appointments.schema';
import { ListParams, WhereParams } from '../../../types';
import {
  AppointmentRepository,
  CreateAppointmentPayload,
  IAppointmentRepository,
  UpdateAppointmentPayload,
} from '../appointment.repository.interface';

interface MongoAppointment extends Appointment {
  __v: any;
  _id: string;
}

export class MongoAppointmentRepository implements IAppointmentRepository {
  private mapAppointment: (
    mongoAppointment: Appointment,
  ) => AppointmentRepository;
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {
    this.mapAppointment = ({
      _id,
      ...appointment
    }: MongoAppointment): AppointmentRepository => {
      delete appointment.__v;
      return { ...appointment, id: _id };
    };
  }

  async generateId(): Promise<string> {
    return new mongoose.Types.ObjectId().toString();
  }

  async create({
    id,
    ...appointment
  }: CreateAppointmentPayload): Promise<AppointmentRepository> {
    const createdAppointment = await this.appointmentModel.create({
      ...appointment,
      _id: id,
    });

    return this.mapAppointment(createdAppointment.toObject());
  }

  async find(appointmentId: string): Promise<AppointmentRepository | null> {
    const appointment = await this.appointmentModel
      .findById(appointmentId)
      .lean();

    if (!appointment) return null;

    return this.mapAppointment(appointment);
  }

  // TODO: convert this params to mongoose query params
  async list({
    where,
    orderBy,
    page,
    pageSize,
  }: ListParams<AppointmentRepository>): Promise<AppointmentRepository[]> {
    const sort: Partial<Record<keyof AppointmentRepository, SortOrder>> = {};

    Object.entries(orderBy || {}).forEach(([key, value]) => {
      const sortKey = key === 'id' ? '_id' : key;
      if (value === 'asc') sort[sortKey] = 1;
      if (value === 'desc') sort[sortKey] = -1;
    });

    const appointments = (await this.appointmentModel
      .find(where, null, {
        limit: pageSize,
        ...(pageSize && page ? { skip: (page - 1) * pageSize } : {}),
      })
      .sort(sort)
      .lean()
      .exec()) as Appointment[];

    return appointments.map(this.mapAppointment);
  }

  async count(where: WhereParams<AppointmentRepository>): Promise<number> {
    return this.appointmentModel.countDocuments(where);
  }

  async update(
    appointmentId: string,
    appointment: UpdateAppointmentPayload,
  ): Promise<AppointmentRepository> {
    const updatedAppointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      appointment,
      { new: true },
    );

    return this.mapAppointment(updatedAppointment.toObject());
  }

  async delete(appointmentId: any): Promise<AppointmentRepository> {
    const deleted = await this.appointmentModel.findByIdAndDelete(
      appointmentId,
    );

    return this.mapAppointment(deleted.toObject());
  }
}
