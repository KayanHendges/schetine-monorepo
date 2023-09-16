"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ProfessionalContext } from "@contexts/professionalContext";
import {
  fetchAssignedBusiness,
  getCurrentBusinessIdCookie,
  saveCurrentBusinessCookie,
} from "./helpers";
import {
  deleteBusiness as apiDeleteBusiness,
  updateBusiness as apiUpdateBusiness,
} from "@providers/api/business";
import { ToastContext } from "@contexts/ToastContext";

export const BusinessContext = createContext({} as IBusinessContext);

export function BusinessProvider({ children }) {
  const { professional } = useContext(ProfessionalContext);
  const { notify } = useContext(ToastContext);
  const [currentBusiness, setCurrentBusiness] =
    useState<AssignedBusiness | null>(null);
  const queryClient = useQueryClient();
  const queryClientName = "assigned_business";

  const {
    data: assignedBusiness,
    isLoading: fetchingAssignedBusiness,
    refetch: refetchAssignedBusiness,
  } = useQuery<AssignedBusiness[]>(queryClientName, () =>
    fetchAssignedBusiness(professional?.id)
  );

  const handleCurrentBusiness = (business: AssignedBusiness | null) => {
    setCurrentBusiness(business);
    saveCurrentBusinessCookie(business);
  };

  const includeBusiness = (payload: Business) => {
    if (!professional) throw new Error("Missing professional");

    const business: AssignedBusiness = { ...payload, owner: professional };
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

  const updateBusiness = async (
    businessId: string,
    payload: UpdateBusinessDTO
  ) => {
    try {
      const updatedBusiness = await apiUpdateBusiness(businessId, payload);
      const indexUpdate = assignedBusiness?.findIndex(
        (it) => it.id === updatedBusiness.id
      );

      if (indexUpdate !== undefined && assignedBusiness && professional) {
        const newList = assignedBusiness;
        newList.splice(indexUpdate, 1, {
          ...updatedBusiness,
          owner: professional,
        });
        queryClient.setQueriesData(queryClientName, newList);
      }

      notify({ header: `Espaço ${updatedBusiness.name} editado com sucesso!` });
      return updatedBusiness;
    } catch (error) {
      notify({ type: "error", header: "Falha ao editar espaço" });
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
        updateBusiness,
        handleCurrentBusiness,
        fetchingAssignedBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}
