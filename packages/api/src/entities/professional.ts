import { v4 as uuidv4 } from 'uuid';

export class Professional {
  public readonly id: string;
  name: string;
  username: string;
  email: string;
  modified?: Date;
  created?: Date;

  constructor(props: Omit<Professional, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
