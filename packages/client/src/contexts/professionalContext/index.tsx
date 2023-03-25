import { AuthContext } from "@contexts/authContext";
import { getLoggedPofessional } from "@providers/api/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProfessionalContext } from "@contexts/professionalContext/types";

export const ProfessionalContext = createContext({} as IProfessionalContext);

export function ProfessionalProvider({ children }) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const { token, logOut } = useContext(AuthContext);

  const currentProfessional = useCallback(
    async (token: string): Promise<Professional | null> => {
      try {
        const data = await getLoggedPofessional();
        setProfessional(data);
        return data;
      } catch (error) {
        setProfessional(null);
        logOut();
        return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [logOut]
  );

  useEffect(() => {
    if (token) currentProfessional(token);
  }, [currentProfessional, token]);

  return (
    <ProfessionalContext.Provider
      value={{
        professional,
        setProfessional,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
}
