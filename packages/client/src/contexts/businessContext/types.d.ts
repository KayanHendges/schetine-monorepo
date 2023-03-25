import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface IBusinessContext {
  assignedBusiness: Business[];
  currentBusiness: Business | null;
  handleCurrentBusiness: (business: Business | null) => void;
  fetchingAssignedBusiness: boolean;
}
