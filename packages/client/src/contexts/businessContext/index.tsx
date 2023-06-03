"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ProfessionalContext } from "@contexts/professionalContext";
import {
  fetchAssignedBusiness,
  getCurrentBusinessIdCookie,
  saveCurrentBusinessCookie,
} from "./helpers";
import { deleteBusiness as apiDeleteBusiness } from "@providers/api/business";
import { ToastContext } from "@contexts/ToastContext";

export const BusinessContext = createContext({} as IBusinessContext);

export function BusinessProvider({ children }) {
  const { professional } = useContext(ProfessionalContext);
  const { notify } = useContext(ToastContext);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const queryClient = useQueryClient();
  const queryClientName = "assigned_business";

  const {
    data: assignedBusiness,
    isLoading: fetchingAssignedBusiness,
    refetch: refetchAssignedBusiness,
  } = useQuery<Business[]>(queryClientName, () =>
    fetchAssignedBusiness(professional?.id)
  );

  const handleCurrentBusiness = (business: Business | null) => {
    setCurrentBusiness(business);
    saveCurrentBusinessCookie(business);
  };

  const includeBusiness = (business: Business) => {
    if (professional) business.owner = professional;
    const newList = [business];
    if (assignedBusiness) newList.push(...assignedBusiness);
    queryClient.setQueryData(queryClientName, newList);
    refetchAssignedBusiness();
    if (!currentBusiness) handleCurrentBusiness(business);
  };

  const deleteBusiness = async (business: Business) => {
    try {
      const deletedBusiness = await apiDeleteBusiness(business.id);
      const newList =
        assignedBusiness?.filter((it) => it.id !== business.id) || [];

      if (deletedBusiness.id === currentBusiness?.id)
        handleCurrentBusiness(newList[0] || null);

      queryClient.setQueriesData(queryClientName, newList);

      notify({ header: `Espaço ${business.name} excluído com sucesso!` });
      return deletedBusiness;
    } catch (error) {
      notify({ type: "error", header: "Falha ao excluir espaço" });
      throw error;
    }
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
        assignedBusiness: assignedBusiness || [],
        currentBusiness,
        includeBusiness,
        deleteBusiness,
        handleCurrentBusiness,
        fetchingAssignedBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}
