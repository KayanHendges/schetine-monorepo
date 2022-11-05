import { Professional } from '@prisma/client';
import { BaseInterfaceRepository } from '../base/base.interface.repository';

export interface ProfessionalsInterfaceRepository
  extends BaseInterfaceRepository<Professional> {}
