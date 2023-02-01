import { Client } from '@prisma/client';
import { IBaseRepository } from '../base/base.interface.repository';

export interface CreateClientData
  extends Omit<Client, 'modified' | 'created'> {}

interface IFindUniqueParams {
  id?: string;
}

export interface IClientRepository extends IBaseRepository<Client> {
  find(unique: IFindUniqueParams): Promise<Client | null>;
}
