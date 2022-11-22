import { Professional } from '@prisma/client';
import { IBaseRepository } from '../base/base.interface.repository';

export interface CreateProfessionalData
  extends Omit<Professional, 'modified' | 'created'> {}

interface IFindUniqueParams {
  id?: string;
  username?: string;
  email?: string;
}

export interface IProfessionalRepository extends IBaseRepository<Professional> {
  create(data: CreateProfessionalData): Promise<Professional>;

  find(unique: IFindUniqueParams): Promise<Professional>;
}
