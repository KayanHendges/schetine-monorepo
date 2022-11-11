import { Professional } from '@prisma/client';
import { IBaseRepository } from '../base/base.interface.repository';

export interface CreateProfessionalData
  extends Omit<Professional, 'modified' | 'created'> {}

export interface IProfessionalRepository extends IBaseRepository<Professional> {
  create(data: CreateProfessionalData): Promise<Professional>;
}
