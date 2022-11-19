import { Professional } from 'src/entities/professional';
import { CreateProfessionalDTO, FindProfessionalDTO } from './professional.dto';

export interface IProfessionalService {
  create(professeional: CreateProfessionalDTO): Promise<Professional>;

  find(params: FindProfessionalDTO): Promise<Professional>;

  list(params: any): Promise<Professional[]>;
}
