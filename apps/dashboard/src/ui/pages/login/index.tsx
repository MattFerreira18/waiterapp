import { Controller, useForm } from "react-hook-form";

import regex from "@/app/lib/regex";
import Button from "@/ui/components/button";
import Input from "@/ui/components/input";
import {
  container,
  form,
  input,
  logo,
  paragraph,
  submitButton,
  wrapper,
} from "./styles.css";

type FormFields = {
  email: string;
  password: string;
};

const MESSAGES = {
  EMAIL: {
    PATTERN: "Insira um e-mail válido",
    REQUIRED: "E-mail é requerido",
  },
  PASSWORD: {
    REQUIRED: "Senha é requerido",
  },
};

function LoginPage() {
  const { formState, control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit({ email, password }: FormFields) {
    console.log({ data: { email, password } });
  }

  return (
    <div className={container}>
      <main className={wrapper}>
        <p className={paragraph}>Bem-vindo(a) ao</p>
        <h1>
          <span className={logo}>WAITER</span>
          <span className={logo}>APP</span>
        </h1>
        <form className={form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <Input
                className={input}
                label="E-mail"
                placeholder="usuario@email.com"
                error={!!error?.type}
                message={error?.message}
                type="email"
                {...field}
              />
            )}
            rules={{
              required: {
                value: true,
                message: MESSAGES.EMAIL.REQUIRED,
              },
              pattern: {
                value: regex.email,
                message: MESSAGES.EMAIL.PATTERN,
              },
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Input
                className={input}
                label="Senha"
                placeholder="Informe sua senha"
                type="password"
                error={!!formState.errors?.password}
                message={error?.message}
                {...field}
              />
            )}
            rules={{
              required: {
                value: true,
                message: MESSAGES.PASSWORD.REQUIRED,
              },
              minLength: 8,
            }}
          />
          <Button
            className={submitButton}
            type="submit"
            disabled={!formState.isValid}
          >
            Fazer Login
          </Button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
