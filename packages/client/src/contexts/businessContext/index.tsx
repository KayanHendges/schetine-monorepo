import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  const {
    data: assignedBusiness,
    isLoading: fetchingAssignedBusiness,
    refetch: refetchAssignedBusiness,
  } = useQuery<Business[]>(
    "assigned_business",
    (ctx) => {
      console.log("revalidating");
      return fetchAssignedBusiness(professional?.id);
    },
    { refetchOnWindowFocus: "always" }
  );

  const handleCurrentBusiness = (business: Business) => {
    setCurrentBusiness(business);
    saveCurrentBusinessCookie(business);
  };

  const includeBusiness = (business: Omit<Business, "owner">) => {
    const businessWithOwner: Business = { ...business, owner: professional };
    const newList = [businessWithOwner, ...assignedBusiness];
    queryClient.setQueryData("assigned_business", newList);
    refetchAssignedBusiness();
    if (!currentBusiness) handleCurrentBusiness(business);
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
        includeBusiness,
        handleCurrentBusiness,
        fetchingAssignedBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}
