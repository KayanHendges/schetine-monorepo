import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import { useContext, useState } from "react";
import { AuthContext } from "@contexts/authContext";
import RegisterForm from "@components/Forms/Register";
import {
  IRegisterFormSchema,
  registerFormSchema,
} from "@components/Forms/Register/registerFormSchema";
import { registerProfessional } from "@providers/api/professional";

export default function Register() {
  const { login } = useContext(AuthContext);
  const form = useForm<IRegisterFormSchema>({
    resolver: joiResolver(registerFormSchema),
  });

  const [errorMessage, setErroMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErroMessage(null);
    try {
      const payload = await handleSubmit(form);
      const { id } = await registerProfessional(payload);
      if (id) login({ email: payload.email, password: payload.password });
    } catch (error) {
      setErroMessage("Houve algum problema com o seu login. Tente novamente.");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96">
        <RegisterForm
          formHook={form}
          onSubmit={handleLogin}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
