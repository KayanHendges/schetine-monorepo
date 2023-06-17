"use client";
import { ILoginFormSchema } from "@components/Forms/Login/loginFormSchema";
import { useContext } from "react";
import { AuthContext } from "@contexts/authContext";
import { useRouter } from "next/navigation";
import { LoginForm } from "@components/Forms/Login";
import { ToastContext } from "@contexts/ToastContext";

export default function Login() {
  const { notify } = useContext(ToastContext);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (payload: ILoginFormSchema) => {
    try {
      await login(payload);
      router.push("/");
      notify({ header: "Login feito com sucesso!", duration: 3 * 1000 });
    } catch (error) {
      const message = error?.message?.includes(401)
        ? "Email ou senha incorreta."
        : "Houve algum problema com o seu login. Tente novamente.";

      notify({ type: "error", header: message });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginForm className="w-96" onSuccess={handleLogin} />
    </div>
  );
}
