import { v4 as uuidv4 } from 'uuid';

export class Business {
  public readonly id: string;
  name: string;
  ownerId: string;
  modified?: Date;
  created?: Date;

  constructor(props: Omit<Business, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
