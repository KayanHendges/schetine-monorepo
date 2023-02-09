import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

const mongooseString = mongoose.Schema.Types.String;
const mongooseNumber = mongoose.Schema.Types.Number;
const mongooseDate = mongoose.Schema.Types.Date;

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({
    type: mongooseNumber,
    unique: true,
    required: true,
  })
  code: number;

  @Prop({
    type: mongooseString,
    required: true,
  })
  businessId: string;

  @Prop({
    type: mongooseString,
    required: true,
  })
  professionalId: string;

  @Prop({
    type: mongooseString,
    required: true,
  })
  clientId: string;

  @Prop({
    type: mongooseNumber,
    required: true,
  })
  price: number;

  @Prop({
    type: mongooseDate,
    required: true,
  })
  start: Date;

  @Prop({
    type: mongooseDate,
    required: true,
  })
  end: Date;

  @Prop({
    type: mongooseNumber,
    required: true,
  })
  duration: number;

  @Prop({
    type: mongooseDate,
    required: true,
  })
  modified: Date;

  @Prop({
    type: mongooseDate,
    required: true,
  })
  created: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
