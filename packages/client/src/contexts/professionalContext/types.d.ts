import { UseFormReturn } from "react-hook-form";

interface IRegisterPayload extends RegisterProfessionalPayload {}

interface IProfessionalContext {
  professional: Professional | null;
  setProfessional: SetState<Professional | null>;
}
