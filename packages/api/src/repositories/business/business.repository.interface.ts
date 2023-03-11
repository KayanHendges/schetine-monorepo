import { Business, BusinessProfessional, Professional } from '@prisma/client';
import { ListParams, WhereParams } from 'src/types';
import { IBaseRepository } from '../base/base.interface.repository';

export interface BusinessRepository
  extends Omit<
    Business,
    'appointments' | 'business' | 'businessProfessional'
  > {}

export interface WhereBusinessParams extends WhereParams<BusinessRepository> {
  associatedProfessional?: Partial<BusinessRepository>;
}
export interface ListBusinessParams extends ListParams<BusinessRepository> {
  where?: WhereBusinessParams;
}

export interface CreateBusinessData
  extends Omit<Business, 'modified' | 'created'> {}

interface IFindUniqueParams extends Pick<Business, 'id'> {}

export interface IDeleteBusinessParams extends Partial<Pick<Business, 'id'>> {}

export interface IListProfessionalAssociations {
  businessId: Business['id'];
  professionalId: Professional['id'];
}

export interface IBusinessRepository
  extends IBaseRepository<BusinessRepository> {
  list(params: ListBusinessParams): Promise<BusinessRepository[]>;

  count(params: ListBusinessParams): Promise<number>;

  find(unique: IFindUniqueParams): Promise<BusinessRepository | null>;

  delete(where: IDeleteBusinessParams): Promise<BusinessRepository>;

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
