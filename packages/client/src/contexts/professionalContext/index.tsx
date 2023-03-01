import { AuthContext } from "@contexts/authContext";
import { IProfessionalContext } from "@contexts/professionalContext/types";
import { getLoggedPofessional } from "@providers/api/auth";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const ProfessionalContext = createContext({} as IProfessionalContext);

export function ProfessionalProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [professional, setProfessional] = useState<Professional | null>(null);

  const currentProfessional = useCallback(
    async (token: string): Promise<Professional | null> => {
      try {
        const { data } = await getLoggedPofessional();
        setProfessional(data);
        return data;
      } catch (error) {
        setProfessional(null);
        return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  useEffect(() => {
    if (token) currentProfessional(token);
  }, [currentProfessional, token]);

  useEffect(() => console.log(professional), [professional]);

  return (
    <ProfessionalContext.Provider value={{ professional, setProfessional }}>
      {children}
    </ProfessionalContext.Provider>
  );
}
