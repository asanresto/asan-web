"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControlLabel, formControlLabelClasses, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "urql";
import { ZodIssue } from "zod";

import { EmailIcon, EyeFilledIcon, LockIcon } from "@/assets";
import { loginDoc } from "@/graphql/documents/user";
import { LoginMutation, MutationLoginArgs } from "@/graphql/types";
import { loginSchema, LoginValues } from "@/models/auth/login";
import { themeColors } from "@/theme";

import ControlledTextField from "../ControlledTextField";
import CustomCheckbox from "../CustomCheckbox";
import PasswordTextField from "../PasswordTextField";
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
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(
          async (data) => {
            const payload = await login({ email: data.email, password: data.password });
            if (payload.data?.login) {
              //   const url = new URL("authenticate", process.env.NEXT_PUBLIC_BASE_URL);
              //   url.searchParams.append("accessToken", payload.data?.login?.accessToken!);
              //   url.searchParams.append("refreshToken", payload.data?.login?.refreshToken!);
              //   router.replace(url.href);
              router.replace("/new-layout/products");
            } else {
              // enqueueSnackbar("Failed to login", { variant: "error" });
            }
          },
          (errors) => {
            console.log(errors);
          },
        )}
      >
        <Stack spacing={2} width="100%">
          <ControlledTextField<LoginValues>
            name="email"
            textField={
              <TextField2
                required
                label="Email"
                fullWidth
                InputProps={{
                  startAdornment: <EmailIcon width="24px" height="24px" style={{ marginLeft: "16px" }} />,
                }}
              />
            }
          />
          <ControlledTextField<LoginValues>
            name="password"
            textField={
              <PasswordTextField
                required
                label="Password"
                fullWidth
                InputProps={{
                  startAdornment: <LockIcon width="24px" height="24px" style={{ marginLeft: "16px" }} />,
                }}
              />
            }
          />
          <Stack direction="row" py={2} spacing={2} justifyContent="space-between">
            <FormControlLabel
              control={<CustomCheckbox variant="outlined" />}
              label={
                <Box
                  fontSize="14px"
                  fontWeight={600}
                  lineHeight="initial"
                  letterSpacing="-0.01em"
                  color={themeColors.brown[80]}
                  ml={1}
                >
                  Remember for 30 days
                </Box>
              }
            />
            <Box
              component={NextLink}
              href="/forgot-password"
              fontSize="16px"
              fontWeight={700}
              lineHeight="initial"
              color={themeColors.green[50]}
              sx={{ textDecoration: "none" }}
            >
              Forgot Password
            </Box>
          </Stack>
          <Button type="submit" variant="contained" color="green1" disabled={loginResult.fetching} size="medium">
            Login
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
