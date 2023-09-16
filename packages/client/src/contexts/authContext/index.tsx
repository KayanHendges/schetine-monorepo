"use client";
import { loginProfessional } from "@providers/api/auth";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const login = async (payload: ILoginPayload): Promise<void> => {
    try {
      const redirectPush = payload?.redirect || "/";
      const jwtPayload = await loginProfessional(payload);
      storeAuth(jwtPayload);
      setToken(jwtPayload.accessToken);
      router.push(redirectPush);
    } catch (error) {
      setToken(null);
      throw new Error(error);
    }
  };

  const storeAuth = ({ accessToken, expiresIn }: AuthPayload) => {
    setCookie(undefined, "auth.token", accessToken, {
      maxAge: expiresIn,
      path: "/",
    });
  };

  const logOut = async (params?: ILogOut) => {
    const redirectPush = params?.redirect || "/login";
    destroyCookie(undefined, "auth.token");
    setToken(null);
    router.push(redirectPush);
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
    <AuthContext.Provider value={{ token, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
