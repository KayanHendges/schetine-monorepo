import { v4 as uuidv4 } from 'uuid';

export class Appointment {
  public readonly id: string;
  code: number;
  businessId: string;
  professionalId: string;
  clientId: string;
  price: number;
  start: Date;
  end: Date;
  duration: number;
  modified?: Date | null;
  created?: Date | null;

  constructor(props: Omit<Appointment, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
