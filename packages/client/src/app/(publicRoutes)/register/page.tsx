"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { handleSubmit } from "@utils/form";
import { useContext, useState } from "react";
import { AuthContext } from "@contexts/authContext";
import {
  IRegisterFormSchema,
  registerFormSchema,
} from "@components/Forms/Register/registerFormSchema";
import { registerProfessional } from "@providers/api/professional";
import { RegisterForm } from "@components/Forms/Register";
import { ToastContext } from "@contexts/ToastContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const { notify } = useContext(ToastContext);
  const form = useForm<IRegisterFormSchema>({
    resolver: joiResolver(registerFormSchema),
  });

  const handleLogin = async () => {
    try {
      const payload = await handleSubmit(form);
      const { id } = await registerProfessional(payload);
      if (id) {
        login({ email: payload.email, password: payload.password });
        notify({ header: "Cadastro concluído com sucesso!" });
      }
    } catch (error) {
      notify({
        type: "error",
        header: "Erro ao cadatrar. Verifique o formulário",
      });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <RegisterForm onSubmit={handleLogin} className="w-96" formHook={form} />
    </div>
  );
}
