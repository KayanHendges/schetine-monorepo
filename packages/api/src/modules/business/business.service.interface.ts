import { Business } from 'src/entities/business';
import { ResponseList } from '../../types';
import {
  AssociateProfessional,
  CreateBusinessDTO,
  DeleteBusinessParam,
  DisassociateProfessional,
  FindBusinessDTO,
  ListBusinessDTO,
  UpdateBusinessDTO,
  UpdateBusinessParam,
} from './business.dto';

export type OwnerId = Business['ownerId'];

export interface IBusinessService {
  create(ownerId: OwnerId, Business: CreateBusinessDTO): Promise<Business>;

  find(params: FindBusinessDTO): Promise<Business>;

  list(params: ListBusinessDTO): Promise<ResponseList<Business>>;

  update(
    ownerId: OwnerId,
    uniqueParam: UpdateBusinessParam,
    Business: UpdateBusinessDTO,
  ): Promise<Business>;

  delete(ownerId: OwnerId, params: DeleteBusinessParam): Promise<Business>;

  associateProfessional(
    ownerId: OwnerId,
    params: AssociateProfessional,
  ): Promise<{ associateId: string }>;

  disassociateProfessional(
    ownerId: OwnerId,
    params: DisassociateProfessional,
  ): Promise<{ message: string }>;
}
