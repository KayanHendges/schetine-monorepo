import { Business } from '@prisma/client';
import { IBaseRepository } from '../base/base.interface.repository';

interface BusinessRepository
  extends Omit<
    Business,
    'appointments' | 'business' | 'businessProfessional'
  > {}

export interface CreateBusinessData
  extends Omit<Business, 'modified' | 'created'> {}

interface IFindUniqueParams {
  id: string;
}

export interface IBusinessRepository
  extends IBaseRepository<BusinessRepository> {
  find(unique: IFindUniqueParams): Promise<BusinessRepository | null>;
}
