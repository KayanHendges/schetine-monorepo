import { loginProfessional } from "@providers/api/auth";
import { setCookie } from "nookies";
import { createContext } from "react";

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }) {
  const login = async (payload: ILoginPayload): Promise<void> => {
    try {
      const { data } = await loginProfessional(payload);
      storeAuth(data);
    } catch (error) {
      // implement toast
      throw Error(error?.response?.data?.message || "Unexpected error");
    }
  };

  const storeAuth = ({ accessToken, expiresIn }: AuthPayload) => {
    setCookie(undefined, "auth.token", accessToken, {
      maxAge: expiresIn,
      path: "/",
    });
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
