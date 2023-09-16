import { Client } from '../../entities/client';
import { ResponseList } from '../../types';
import {
  CreateClientDTO,
  DeleteClientParam,
  FindClientDTO,
  ListClientDTO,
  UpdateClientDTO,
  UpdateClientParam,
} from '../client/client.dto';

export interface IClientService {
  create(client: CreateClientDTO): Promise<Client>;

  find(params: FindClientDTO): Promise<Client>;

  list(params: ListClientDTO): Promise<ResponseList<Client>>;

  update(
    uniqueParam: UpdateClientParam,
    client: UpdateClientDTO,
  ): Promise<Client>;

  delete(params: DeleteClientParam): Promise<Client>;
}
