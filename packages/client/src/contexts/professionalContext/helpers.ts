import { listBusiness } from "@providers/api/business";

export const fetchAssignedBusiness = async (
  professionalId: string | undefined
) => {
  if (!professionalId) return [];
  try {
    const { list } = await listBusiness({
      associatedProfessionalId: professionalId,
    });
    return list;
  } catch (error) {
    return [];
  }
};
