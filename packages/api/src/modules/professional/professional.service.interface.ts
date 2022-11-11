import { Professional } from 'src/entities/professional';
import { CreateProfessionalDTO } from './professional.dto';

export interface IProfessionalService {
  create(professeional: CreateProfessionalDTO): Promise<Professional>;
}
