import { ProfessionalCredential } from '@prisma/client';
import { Professional } from 'src/entities/professional';

interface IStoreProfessionalCredentialPayload {
  professionalId: Professional['id'];
  password: string;
}

interface IUpdateProfessionalCredentialPayload {
  password?: string;
}

interface IAuthRepository {
  findProfessionalCredential(
    professionalId: Professional['id'],
  ): Promise<ProfessionalCredential>;

  storeProfessionalCredential(
    payload: IStoreProfessionalCredentialPayload,
  ): Promise<ProfessionalCredential>;

  updateProfessionalCredential(
    professionalId: Professional['id'],
    payload: IUpdateProfessionalCredentialPayload,
  ): Promise<ProfessionalCredential>;
}
