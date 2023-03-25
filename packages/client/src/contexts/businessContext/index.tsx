import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IBusinessContext } from "@contexts/businessContext/types";
import { ProfessionalContext } from "@contexts/professionalContext";
import {
  fetchAssignedBusiness,
  getCurrentBusinessIdCookie,
  saveCurrentBusinessCookie,
} from "./helpers";

export const BusinessContext = createContext({} as IBusinessContext);

export function BusinessProvider({ children }) {
  const { professional } = useContext(ProfessionalContext);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);

  const {
    data: assignedBusiness,
    isLoading: fetchingAssignedBusiness,
    refetch: refetchAssignedBusiness,
  } = useQuery<Business[]>("assigned_business", (ctx) =>
    fetchAssignedBusiness(professional?.id)
  );

  const handleCurrentBusiness = (business: Business) => {
    setCurrentBusiness(business);
    saveCurrentBusinessCookie(business);
  };

  useEffect(() => {
    if (!professional) return;
    refetchAssignedBusiness();
  }, [professional, refetchAssignedBusiness]);

  useEffect(() => {
    if (!assignedBusiness?.length) return;

    const savedBusinessId = getCurrentBusinessIdCookie();
    const savedBusiness = assignedBusiness.find(
      ({ id }) => id === savedBusinessId
    );

    setCurrentBusiness(savedBusiness || assignedBusiness[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedBusiness]);

  return (
    <BusinessContext.Provider
      value={{
        assignedBusiness,
        currentBusiness,
        handleCurrentBusiness,
        fetchingAssignedBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}
