import { listAssignedBusiness } from "@providers/api/business";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export const fetchAssignedBusiness = async (
  professionalId: string | undefined
) => {
  if (!professionalId) return [];
  try {
    const { list } = await listAssignedBusiness({
      associatedProfessionalId: professionalId,
    });
    return list;
  } catch (error) {
    return [];
  }
};

const businessCookieKey = "business.current";

export const getCurrentBusinessIdCookie = (): string | null => {
  return parseCookies()[businessCookieKey] || null;
};

export const saveCurrentBusinessCookie = (
  business: AssignedBusiness | null
) => {
  destroyCookie(undefined, businessCookieKey);

  if (business?.id)
    setCookie(undefined, businessCookieKey, business.id, {
      path: "/",
    });
};
