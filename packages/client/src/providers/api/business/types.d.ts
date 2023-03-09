interface Professional {
  id: string;
  name: string;
  ownerId: string;
  created: Date;
  modified: Date;
}

interface ListBusinessParams
  extends ApiPagination<Professional>,
    Partial<Professional> {}
