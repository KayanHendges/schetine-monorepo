import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface IRegisterPayload extends RegisterProfessionalPayload {}

interface IProfessionalContext {
  professional: Professional | null;
  setProfessional: Dispatch<SetStateAction<Professional | null>>;
  currentBusinessForm: UseFormReturn<Business | null>;
  assignedBusiness: Business[];
}
