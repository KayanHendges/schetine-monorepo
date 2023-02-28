import { registerProfessional } from "@providers/api/professional";
import { createContext } from "react";

export const ProfessionalContext = createContext({} as IProfessionalContext);

export function ProfessionalProvider({ children }) {
  return (
    <ProfessionalContext.Provider value={{}}>
      {children}
    </ProfessionalContext.Provider>
  );
}
