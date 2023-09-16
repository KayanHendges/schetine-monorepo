interface Client {
  id: string;
  name: string;
  businessId: string;
  phone: string | null;
  cpf: string | null;
  birth: Date | null;
  email: string | null;
  comment: string | null;
  modified?: Date | null;
  created?: Date | null;
}
