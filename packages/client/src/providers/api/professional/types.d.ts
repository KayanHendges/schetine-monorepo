interface Professional {
  id: string;
  name: string;
  username: string;
  email: string;
  modified: Date;
  created: Date;
}

interface FindProfessionalParams {
  id?: string;
  username?: string;
  email?: string;
}

interface RegisterProfessionalPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}
