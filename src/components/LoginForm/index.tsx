"use client";

import { loginDoc } from "@/graphql/documents/user";
import { LoginMutation, MutationLoginArgs } from "@/graphql/types";
import { LoginValues, loginSchema } from "@/models/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "urql";
import { ZodIssue } from "zod";
import ControlledTextField from "../ControlledTextField";
import TextField2 from "../TextFields2";

const LoginForm = () => {
  const methods = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit, setError } = methods;
  const [loginResult, login] = useMutation<LoginMutation, MutationLoginArgs>(loginDoc);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // const errors: ZodIssue[] = JSON.parse(
  //   (loginResult.error?.graphQLErrors?.[0].extensions as any)?.originalError?.message ?? null,
  // );

  // useEffect(() => {
  //   if (errors) {
  //     errors.forEach((item) => {
  //       setError(item.path[0] as any, { message: item.message });
  //     });
  //   }
  // }, [errors, setError]);

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={handleSubmit(async (data) => {
          const payload = await login({ email: data.email, password: data.password });
          if (payload.data?.login) {
            const url = new URL("authenticate", process.env.NEXT_PUBLIC_BASE_URL);
            url.searchParams.append("accessToken", payload.data?.login?.accessToken!);
            url.searchParams.append("refreshToken", payload.data?.login?.refreshToken!);
            router.replace(url.href);
          } else {
            enqueueSnackbar("Failed to login", { variant: "error" });
          }
        })}
      >
        <Stack width="448px" maxWidth="100%" spacing={2}>
          <ControlledTextField<LoginValues> name="email" textField={<TextField2 required label="Email" fullWidth />} />
          <ControlledTextField<LoginValues>
            name="password"
            textField={<TextField2 type="password" required label="Password" fullWidth />}
          />
          <Button type="submit" variant="contained" disabled={loginResult.fetching} size="medium">
            Login
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
