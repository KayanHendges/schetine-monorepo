import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { AuthContext } from "@contexts/authContext";
import { IProfessionalContext } from "@contexts/professionalContext/types";
import { joiResolver } from "@hookform/resolvers/joi";
import { getLoggedPofessional } from "@providers/api/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { fetchAssignedBusiness } from "@contexts/professionalContext/helpers";

export const ProfessionalContext = createContext({} as IProfessionalContext);

export function ProfessionalProvider({ children }) {
  const [professional, setProfessional] = useState<Professional | null>(null);

  const {
    data: assignedBusiness,
    isLoading: fetchingAssignedBusiness,
    refetch: refetchAssignedBusiness,
  } = useQuery<Business[]>("assigned_business", (ctx) =>
    fetchAssignedBusiness(professional?.id)
  );
  const { token } = useContext(AuthContext);

  const currentBusinessForm = useForm<Business | null>({
    resolver: joiResolver(businessFormSchema.allow(null)),
  });

  const currentProfessional = useCallback(
    async (token: string): Promise<Professional | null> => {
      try {
        const data = await getLoggedPofessional();
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

  useEffect(() => {
    if (!professional) return;
    refetchAssignedBusiness();
  }, [professional, refetchAssignedBusiness]);

  return (
    <ProfessionalContext.Provider
      value={{
        professional,
        setProfessional,
        currentBusinessForm,
        assignedBusiness,
        fetchingAssignedBusiness,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
}
