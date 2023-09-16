import { Injectable, Inject } from '@nestjs/common';
import { ProfessionalCredential } from '@prisma/client';
import { PrismaService } from '../../../providers/db/prisma/prisma.service';
import {
  IAuthRepository,
  IStoreProfessionalCredentialPayload,
  IUpdateProfessionalCredentialPayload,
} from '../auth.repository.interface';

@Injectable()
export class PrismaAuthRepository implements IAuthRepository {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}
  findProfessionalCredential(
    professionalId: string,
  ): Promise<ProfessionalCredential> {
    return this.prisma.professionalCredential.findUnique({
      where: { professionalId },
    });
  }

  storeProfessionalCredential(
    data: IStoreProfessionalCredentialPayload,
  ): Promise<ProfessionalCredential> {
    return this.prisma.professionalCredential.create({
      data,
    });
  }

  updateProfessionalCredential(
    professionalId: string,
    data: IUpdateProfessionalCredentialPayload,
  ): Promise<ProfessionalCredential> {
    return this.prisma.professionalCredential.update({
      where: { professionalId },
      data,
    });
  }
}
