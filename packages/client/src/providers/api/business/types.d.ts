type BusinessIncludeEnum = "owner" | "client" | "businessProfessional"

interface Business {
  id: string;
  name: string;
  ownerId: string;
  owner?: Professional;
  modified: Date;
  created: Date;
}

interface ListBusinessParams
  extends ApiPagination<Professional>,
    Partial<Professional> {
  associatedProfessionalId?: string;
  include?: BusinessIncludeEnum[]
}

interface CreateBusinessDTO {
  name: string;
}

interface UpdateBusinessDTO {
  name: string;
}
