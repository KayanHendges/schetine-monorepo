type IRegisterPayload = RegisterProfessionalPayload;

interface IProfessionalContext {
  professional: Professional | null;
  setProfessional: SetState<Professional | null>;
}
