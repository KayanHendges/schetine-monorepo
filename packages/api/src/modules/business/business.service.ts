import { Injectable, Inject, HttpException } from '@nestjs/common';
import {
  IBusinessRepository,
  ListBusinessParams,
} from '../../repositories/business/business.repository.interface';
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
    const {
      page,
      pageSize,
      orderBy,
      associatedProfessionalId,
      include,
      ...where
    } = params;

    const repositoryParams: ListBusinessParams = {
      where: {
        ...where,
        associatedProfessional: associatedProfessionalId
          ? { id: associatedProfessionalId }
          : undefined,
      },
      include,
      page,
      pageSize,
      orderBy,
    };

    try {
      const list = await this.businessRepository.list(repositoryParams);
      const count = await this.businessRepository.count({
        where: repositoryParams?.where,
      });

      return { page, pageSize, list, count };
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    ownerId: OwnerId,
    where: UpdateBusinessParam,
    business: UpdateBusinessDTO,
  ): Promise<Business> {
    const businessFound = await this.businessRepository.find(where);

    if (businessFound.ownerId !== ownerId)
      new HttpException(
        'Professional not allowed to update this business',
        403,
      );

    return await this.businessRepository.update(where, business);
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
