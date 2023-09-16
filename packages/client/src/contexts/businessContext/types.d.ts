interface IBusinessContext {
  assignedBusiness: Business[];
  currentBusiness: Business | null;
  includeBusiness: (business: Omit<Business, "owner">) => void;
  updateBusiness: (
    businessId: string,
    payload: UpdateBusinessDTO
  ) => Promise<Business>;
  deleteBusiness: (business: Omit<Business, "owner">) => Promise<Business>;
  handleCurrentBusiness: (business: Business | null) => void;
  fetchingAssignedBusiness: boolean;
}
