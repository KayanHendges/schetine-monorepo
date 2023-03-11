import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { AuthContext } from "@contexts/authContext";
import { IProfessionalContext } from "@contexts/professionalContext/types";
import { joiResolver } from "@hookform/resolvers/joi";
import { getLoggedPofessional } from "@providers/api/auth";
import { listBusinesss } from "@providers/api/business";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

export const ProfessionalContext = createContext({} as IProfessionalContext);

export function ProfessionalProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [assignedBusiness, setAssignedBusiness] = useState<Business[]>([]);

  const currentBusinessForm = useForm<Business | null>({
    resolver: joiResolver(businessFormSchema.allow(null)),
  });

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

  const getAssignedBusiness = useCallback(
    async (professional: Professional) => {
      try {
        const { list } = await listBusinesss({
          associatedProfessionalId: professional.id,
        });
        currentBusinessForm.reset(list[0] || null);
        setAssignedBusiness(list);
      } catch (error) {
        setAssignedBusiness([]);
      }
    },
    [currentBusinessForm]
  );

  useEffect(() => {
    if (token) currentProfessional(token);
  }, [currentProfessional, token]);

  useEffect(() => {
    if (professional) getAssignedBusiness(professional);
  }, [getAssignedBusiness, professional]);

  return (
    <ProfessionalContext.Provider
      value={{
        professional,
        setProfessional,
        currentBusinessForm,
        assignedBusiness,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
}
