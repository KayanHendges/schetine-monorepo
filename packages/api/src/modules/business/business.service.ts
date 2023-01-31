import { Injectable, Inject } from '@nestjs/common';
import { IBusinessRepository } from '../../repositories/business/business.repository.interface';
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
import { IBusinessService } from './business.service.interface';
import { Business } from '../../entities/business';
import { ResponseList } from '../../types';

@Injectable()
export class BusinessService implements IBusinessService {
  constructor(
    @Inject('IBusinessRepository')
    private readonly businessRepository: IBusinessRepository,
  ) {}
  async create(createBusiness: CreateBusinessDTO): Promise<Business> {
    const business = new Business(createBusiness);
    return await this.businessRepository.create(business);
  }

  async find(param: FindBusinessDTO): Promise<Business> {
    const business = await this.businessRepository.find(param);

    if (!business) {
      throw new Error(`business not found`);
    }

    return business;
  }

  async list(params: ListBusinessDTO): Promise<ResponseList<Business>> {
    const { page, pageSize, orderBy, ...where } = params;
    const repositoryParams = {
      where,
      page,
      pageSize,
      orderBy,
    };

    const count = await this.businessRepository.count(repositoryParams);
    const list = await this.businessRepository.list(repositoryParams);

    return { page, pageSize, list, count };
  }

  async update(
    where: UpdateBusinessParam,
    business: UpdateBusinessDTO,
  ): Promise<Business> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.businessRepository.update(where, business);
  }

  async delete(where: DeleteBusinessParam): Promise<Business> {
    return await this.businessRepository.delete(where);
  }

  async associateProfessional({
    businessId,
    professionalId,
  }: AssociateProfessional): Promise<{ associateId: string }> {
    const { id } = await this.businessRepository.associateProfessional(
      businessId,
      professionalId,
    );

    return { associateId: id };
  }

  async disassociateProfessional({
    businessId,
    professionalId,
  }: DisassociateProfessional): Promise<{ message: string }> {
    const { count } = await this.businessRepository.diassociateProfessional(
      businessId,
      professionalId,
    );

    if (!count)
      throw new Error(
        'Association between this business and professional not found',
      );

    return { message: 'Association removed with success.' };
  }
}
