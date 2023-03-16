import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import { useContext, useState } from "react";
import { AuthContext } from "@contexts/authContext";
import { useRouter } from "next/router";
import RegisterForm from "@components/Forms/Register";
import {
  IRegisterFormSchema,
  registerFormSchema,
} from "@components/Forms/Register/registerFormSchema";
import { registerProfessional } from "@providers/api/professional";

export default function Register() {
  const form = useForm<IRegisterFormSchema>({
    resolver: joiResolver(registerFormSchema),
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErroMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setErroMessage(null);
    try {
      const payload = await handleSubmit(form.handleSubmit);
      await registerProfessional(payload);
      router.push("/");
    } catch (error) {
      setErroMessage("Houve algum problema com o seu login. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96">
        <RegisterForm
          formRef={form}
          onSubmit={handleLogin}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}