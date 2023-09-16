import { v4 as uuidv4 } from 'uuid';

export class Client {
  public readonly id: string;
  name: string;
  businessId: string;
  phone: string | null;
  cpf: string | null;
  birth: Date | null;
  email: string | null;
  comment: string | null;
  modified?: Date | null;
  created?: Date | null;

  constructor(props: Omit<Client, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
