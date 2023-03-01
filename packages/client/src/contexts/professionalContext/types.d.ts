import { Dispatch, SetStateAction } from "react";

interface IRegisterPayload extends RegisterProfessionalPayload {}

interface IProfessionalContext {
  professional: Professional | null;
  setProfessional: Dispatch<SetStateAction<Professional | null>>;
}
