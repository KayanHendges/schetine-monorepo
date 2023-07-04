import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { IProfessionalRepository } from 'src/repositories/professionals/professionals.repository.interface';
import {
  CreateProfessionalDTO,
  DeleteProfessionalParam,
  FindProfessionalDTO,
  ListProfessionalDTO,
  UpdateProfessionalDTO,
  UpdateProfessionalParam,
} from './professional.dto';
import { IProfessionalService } from './professional.service.interface';
import { Professional } from '../../entities/professional';
import { ResponseList } from '../../types';
import { IAuthRepository } from 'src/repositories/auth/auth.repository.interface';

@Injectable()
export class ProfessionalService implements IProfessionalService {
  constructor(
    @Inject('IProfessionalRepository')
    private readonly professionalRepository: IProfessionalRepository,
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}
  async create({
    password,
    ...createProfessional
  }: CreateProfessionalDTO): Promise<Professional> {
    const professional = new Professional(createProfessional);
    const passwordHash = bcrypt.hashSync(password, 8) as string;

    try {
      console.log(professional);
      const createdProfessional = await this.professionalRepository.create(
        professional,
      );

      await this.authRepository.storeProfessionalCredential({
        professionalId: createdProfessional.id,
        password: passwordHash,
      });
      return createdProfessional;
    } catch (error) {
      console.log(error);
    }
  }

  async find(param: FindProfessionalDTO): Promise<Professional> {
    const professionalFound = await this.professionalRepository.find(param);

    if (!professionalFound) {
      throw new Error(`Professional not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const professional = professionalFound;

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const professional = value;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updated = await this.professionalRepository.update(
      where,
      professional,
    );

    return updated;
  }

  async delete(where: DeleteProfessionalParam): Promise<Professional> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleted = await this.professionalRepository.delete(where);

    return deleted;
  }
}
