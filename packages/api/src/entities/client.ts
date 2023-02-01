import { v4 as uuidv4 } from 'uuid';

export class Client {
  public readonly id: string;
  name: string;
  phone?: string;
  cpf?: string;
  birth?: Date;
  email?: string;
  comment: string;
  modified?: Date;
  created?: Date;

  constructor(props: Omit<Client, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
