import { loginProfessional } from "@providers/api/auth";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [token, setToken] = useState<string | null>();

  const login = async (payload: ILoginPayload): Promise<void> => {
    try {
      const { data } = await loginProfessional(payload);
      storeAuth(data);
      setToken(data.accessToken);
    } catch (error) {
      // implement toast
      setToken(null);
      throw Error(error?.response?.data?.message || "Unexpected error");
    }
  };

  const storeAuth = ({ accessToken, expiresIn }: AuthPayload) => {
    setCookie(undefined, "auth.token", accessToken, {
      maxAge: expiresIn,
      path: "/",
    });
  };

  const authCheck = () => {
    const { "auth.token": token } = parseCookies();
    setToken(token || null);
  };

  useEffect(() => {
    authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}
