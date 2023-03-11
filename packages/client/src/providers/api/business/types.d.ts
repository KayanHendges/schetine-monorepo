interface Business {
  id: string;
  name: string;
  ownerId: string;
  modified: Date;
  created: Date;
}

interface ListBusinessParams
  extends ApiPagination<Professional>,
    Partial<Professional> {
  associatedProfessionalId?: string;
}

interface CreateBusinessDTO {
  name: string;
}

interface UpdateBusinessDTO {
  name: string;
}
