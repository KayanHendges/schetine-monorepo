type BusinessIncludeEnum = "owner" | "client" | "businessProfessional";

interface Business {
  id: string;
  name: string;
  ownerId: string;
  modified: Date;
  created: Date;
}

interface AssignedBusiness extends Business {
  owner: Professional;
}

interface ListBusinessParams
  extends ApiPagination<Professional>,
    Partial<Professional> {
  associatedProfessionalId?: string;
}

interface CreateBusinessDTO {
  name: string;
}

type UpdateBusinessDTO = Partial<CreateBusinessDTO>;
