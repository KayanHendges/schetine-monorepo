import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { IProfessionalRepository } from 'src/repositories/professionals/professionals.repository.interface';
import {
  CreateProfessionalDTO,
  FindProfessionalDTO,
  ListProfessionalDTO,
} from './professional.dto';
import { IProfessionalService } from './professional.service.interface';
import { Professional } from '../../entities/professional';

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
    const password = bcrypt.hashSync(createProfessional.password, 8) as string;
    const createdProfessional = await this.professionalRepository.create({
      ...professional,
      password,
    });
    delete createdProfessional.password;
    return createdProfessional;
  }

  async find(param: FindProfessionalDTO): Promise<Professional> {
    const professional = await this.professionalRepository.find(param);

    if (!professional) {
      throw new Error(`professional not found`);
    }

    return professional;
  }

  async list(params: ListProfessionalDTO): Promise<Professional[]> {
    return await this.professionalRepository.list({ where: params });
  }
}
