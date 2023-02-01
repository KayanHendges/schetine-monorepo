import { Professional } from 'src/entities/professional';
import { ResponseList } from '../../types';
import {
  CreateProfessionalDTO,
  DeleteProfessionalParam,
  FindProfessionalDTO,
  ListProfessionalDTO,
  UpdateProfessionalDTO,
  UpdateProfessionalParam,
} from './professional.dto';

export interface IProfessionalService {
  create(professional: CreateProfessionalDTO): Promise<Professional>;

  find(params: FindProfessionalDTO): Promise<Professional>;

  list(params: ListProfessionalDTO): Promise<ResponseList<Professional>>;

  update(
    uniqueParam: UpdateProfessionalParam,
    professional: UpdateProfessionalDTO,
  ): Promise<Professional>;

  delete(params: DeleteProfessionalParam): Promise<Professional>;
}
