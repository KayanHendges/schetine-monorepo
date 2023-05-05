import { UseFormReturn } from "react-hook-form";

interface IBusinessContext {
  assignedBusiness: Business[];
  currentBusiness: Business | null;
  includeBusiness: (business: Omit<Business, "owner">) => void;
  handleCurrentBusiness: (business: Business | null) => void;
  fetchingAssignedBusiness: boolean;
}
