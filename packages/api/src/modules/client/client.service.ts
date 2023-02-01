import { Injectable, Inject } from '@nestjs/common';
import {
  CreateClientDTO,
  DeleteClientParam,
  FindClientDTO,
  ListClientDTO,
  UpdateClientDTO,
  UpdateClientParam,
} from './client.dto';
import { IClientService } from './client.service.interface';
import { ResponseList } from '../../types';
import { Client } from '../../entities/client';
import { IClientRepository } from '../../repositories/clients/clients.repository.interface';
import { IBusinessRepository } from '../../repositories/business/business.repository.interface';

@Injectable()
export class ClientService implements IClientService {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('IBusinessRepository')
    private readonly businessRepository: IBusinessRepository,
  ) {}
  async create(dto: CreateClientDTO): Promise<Client> {
    const business = await this.businessRepository.find({ id: dto.businessId });

    if (!business) throw new Error(`Business not found`);

    const client = new Client(dto);

    return await this.clientRepository.create(client);
  }

  async find(param: FindClientDTO): Promise<Client> {
    const client = await this.clientRepository.find(param);

    if (!client) throw new Error(`Client not found`);

    return client;
  }

  async list(params: ListClientDTO): Promise<ResponseList<Client>> {
    const { page, pageSize, orderBy, ...where } = params;
    const repositoryParams = {
      where,
      page,
      pageSize,
      orderBy,
    };

    const count = await this.clientRepository.count(repositoryParams);
    const list = await this.clientRepository.list(repositoryParams);

    return { page, pageSize, list, count };
  }

  async update(
    where: UpdateClientParam,
    client: UpdateClientDTO,
  ): Promise<Client> {
    const updatedClient = await this.clientRepository.update(where, client);

    return updatedClient;
  }

  async delete(where: DeleteClientParam): Promise<Client> {
    const deleted = await this.clientRepository.delete(where);

    return deleted;
  }
}
