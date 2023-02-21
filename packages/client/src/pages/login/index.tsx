import { useForm } from "react-hook-form";
import LoginForm from "@components/Forms/Login";
import {
  ILoginFormSchema,
  loginFormSchema,
} from "@components/Forms/Login/loginFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@components/form";

export default function Login() {
  const form = useForm<ILoginFormSchema>({
    resolver: joiResolver(loginFormSchema),
  });

  const handleLogin = async () => {
    const payload = await handleSubmit(form.handleSubmit);

    console.log(payload);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96">
        <LoginForm formRef={form} onSubmit={handleLogin} />
      </div>
    </div>
  );
}
