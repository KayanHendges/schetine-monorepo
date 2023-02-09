import { Business, BusinessProfessional, Professional } from '@prisma/client';
import { IBaseRepository } from '../base/base.interface.repository';

interface BusinessRepository
  extends Omit<
    Business,
    'appointments' | 'business' | 'businessProfessional'
  > {}

export interface CreateBusinessData
  extends Omit<Business, 'modified' | 'created'> {}

interface IFindUniqueParams extends Pick<Business, 'id'> {}

export interface IListProfessionalAssociations {
  businessId: Business['id'];
  professionalId: Professional['id'];
}

export interface IBusinessRepository
  extends IBaseRepository<BusinessRepository> {
  find(unique: IFindUniqueParams): Promise<BusinessRepository | null>;

  listProfessionalAssociations(
    params: IListProfessionalAssociations,
  ): Promise<BusinessProfessional[]>;

  associateProfessional(
    businessId: string,
    professionalId: string,
  ): Promise<BusinessProfessional>;

  diassociateProfessional(
    businessId: string,
    professionalId: string,
  ): Promise<{ count: number }>;
}
