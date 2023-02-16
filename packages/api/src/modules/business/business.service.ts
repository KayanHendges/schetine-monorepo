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
import { IBusinessService, OwnerId } from './business.service.interface';
import { Business } from '../../entities/business';
import { ResponseList } from '../../types';

@Injectable()
export class BusinessService implements IBusinessService {
  constructor(
    @Inject('IBusinessRepository')
    private readonly businessRepository: IBusinessRepository,
  ) {}
  async create(
    ownerId: OwnerId,
    createBusiness: CreateBusinessDTO,
  ): Promise<Business> {
    const business = new Business({ ...createBusiness, ownerId });
    const createdBusiness = await this.businessRepository.create(business);

    await this.businessRepository.associateProfessional(
      createdBusiness.id,
      ownerId,
    );

    return createdBusiness;
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
    ownerId: OwnerId,
    where: UpdateBusinessParam,
    business: UpdateBusinessDTO,
  ): Promise<Business> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.businessRepository.update(
      { ...where, ownerId },
      business,
    );
  }

  async delete(
    ownerId: OwnerId,
    where: DeleteBusinessParam,
  ): Promise<Business> {
    const business = await this.businessRepository.find(where);

    if (!business) throw Error('Bussiness not found');
    if (business.ownerId !== ownerId)
      throw Error("Permission denied. You aren't the owner of this business");

    return await this.businessRepository.delete(where);
  }

  async associateProfessional(
    ownerId: OwnerId,
    { businessId, professionalId }: AssociateProfessional,
  ): Promise<{ associateId: string }> {
    const { id } = await this.businessRepository.associateProfessional(
      businessId,
      professionalId,
    );

    return { associateId: id };
  }

  async disassociateProfessional(
    ownerId: OwnerId,
    { businessId, professionalId }: DisassociateProfessional,
  ): Promise<{ message: string }> {
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
