"use client";
import { useForm } from "react-hook-form";
import {
  ILoginFormSchema,
  loginFormSchema,
} from "@components/Forms/Login/loginFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import { useContext, useState } from "react";
import { AuthContext } from "@contexts/authContext";
import { useRouter } from "next/navigation";
import { LoginForm } from "@components/Forms/Login";

export default function Login() {
  const { login } = useContext(AuthContext);
  const form = useForm<ILoginFormSchema>({
    resolver: joiResolver(loginFormSchema),
  });
  const router = useRouter();

  const [errorMessage, setErroMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    console.log("handleLogin");
    setErroMessage(null);
    try {
      const payload = await handleSubmit(form);
      await login(payload);
      router.push("/");
    } catch (error) {
      if (error?.message?.includes("Invalid credentials"))
        setErroMessage("Email ou senha incorreta");
      else
        setErroMessage(
          "Houve algum problema com o seu login. Tente novamente."
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginForm
        className="w-96"
        formHook={form}
        onSubmit={handleLogin}
        errorMessage={errorMessage}
      />
    </div>
  );
}
