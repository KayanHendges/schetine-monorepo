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
import { FormContainerProvider } from "@components/Containers/Form";

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
      <FormContainerProvider onSubmit={handleLogin} className="w-96">
        <LoginForm
          formRef={form}
          onSubmit={handleLogin}
          errorMessage={errorMessage}
        />
      </FormContainerProvider>
    </div>
  );
}
