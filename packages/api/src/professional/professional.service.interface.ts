import { Professional } from 'src/entities/professional';
import { CreateProfessionalDTO } from './professional.dto';

export interface ProfessionalServiceInterface {
  create(professeional: CreateProfessionalDTO): Promise<Professional>;
}
