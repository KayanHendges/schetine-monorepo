import { Business } from 'src/entities/business';
import { ResponseList } from '../../types';
import {
  CreateBusinessDTO,
  DeleteBusinessParam,
  FindBusinessDTO,
  ListBusinessDTO,
  UpdateBusinessDTO,
  UpdateBusinessParam,
} from './business.dto';

export interface IBusinessService {
  create(Business: CreateBusinessDTO): Promise<Business>;

  find(params: FindBusinessDTO): Promise<Business>;

  list(params: ListBusinessDTO): Promise<ResponseList<Business>>;

  update(
    uniqueParam: UpdateBusinessParam,
    Business: UpdateBusinessDTO,
  ): Promise<Business>;

  delete(params: DeleteBusinessParam): Promise<Business>;
}
