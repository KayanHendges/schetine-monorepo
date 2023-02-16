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

  constructor(props: Appointment) {
    Object.assign(this, props);
  }
}
