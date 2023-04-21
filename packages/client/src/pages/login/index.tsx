import { useForm } from "react-hook-form";
import LoginForm from "@components/Forms/Login";
import {
  ILoginFormSchema,
  loginFormSchema,
} from "@components/Forms/Login/loginFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import { loginProfessional } from "@providers/api/auth";
import { useContext, useState } from "react";
import { AuthContext } from "@contexts/authContext";
import { useRouter } from "next/router";

export default function Login() {
  const { login } = useContext(AuthContext);
  const form = useForm<ILoginFormSchema>({
    resolver: joiResolver(loginFormSchema),
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErroMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setErroMessage(null);
    try {
      const payload = await handleSubmit(form.handleSubmit);
      await login(payload);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
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
      <div className="w-96">
        <LoginForm
          formRef={form}
          onSubmit={handleLogin}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
