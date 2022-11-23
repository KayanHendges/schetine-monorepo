import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { IProfessionalRepository } from 'src/repositories/professionals/professionals.repository.interface';
import {
  CreateProfessionalDTO,
  FindProfessionalDTO,
  ListProfessionalDTO,
  UpdateProfessionalDTO,
  UpdateProfessionalParam,
} from './professional.dto';
import { IProfessionalService } from './professional.service.interface';
import { Professional } from '../../entities/professional';
import { ResponseList } from '../../types';

@Injectable()
export class ProfessionalService implements IProfessionalService {
  constructor(
    @Inject('IProfessionalRepository')
    private readonly professionalRepository: IProfessionalRepository,
  ) {}
  async create(
    createProfessional: CreateProfessionalDTO,
  ): Promise<Professional> {
    const professional = new Professional(createProfessional);
    const passwordHash = bcrypt.hashSync(
      createProfessional.password,
      8,
    ) as string;

    const { password, ...createdProfessional } =
      await this.professionalRepository.create({
        ...professional,
        password: passwordHash,
      });

    return createdProfessional;
  }

  async find(param: FindProfessionalDTO): Promise<Professional> {
    const professional = await this.professionalRepository.find(param);

    if (!professional) {
      throw new Error(`professional not found`);
    }

    return professional;
  }

  async list(params: ListProfessionalDTO): Promise<ResponseList<Professional>> {
    const { page, pageSize, orderBy, ...where } = params;
    const repositoryParams = {
      where,
      page,
      pageSize,
      orderBy,
    };

    const count = await this.professionalRepository.count(repositoryParams);
    const list = (await this.professionalRepository.list(repositoryParams)).map(
      (value) => {
        const { password, ...professional } = value;
        return professional;
      },
    );

    return { page, pageSize, list, count };
  }

  async update(
    where: UpdateProfessionalParam,
    professional: UpdateProfessionalDTO,
  ): Promise<Professional> {
    professional;
    const { password, ...updated } = await this.professionalRepository.update(
      where,
      professional,
    );

    return updated;
  }
}
