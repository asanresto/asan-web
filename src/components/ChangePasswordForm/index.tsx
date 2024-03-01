"use client";

import { ChangePasswordValues, changePasswordSchema } from "@/models/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertProps, Button, Snackbar, Stack, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextField from "../ControlledTextField";
import { useMutation } from "@urql/next";
import { ChangePasswordMutation, ChangePasswordMutationVariables } from "@/graphql/types";
import { changePasswordDoc } from "@/graphql/documents/user";
import { useState } from "react";

const ChangePasswordForm = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertProps["severity"] }>({
    open: false,
    message: "",
    severity: "success",
  });
  const methods = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema) });
  const [changePasswordResult, changePassword] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    changePasswordDoc,
  );

  const { handleSubmit, reset } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (data) => {
            const payload = await changePassword({
              currentPassword: data.currentPassword,
              newPassword: data.newPassword,
              confirmPassword: data.confirmPassword,
            });
            if (payload.data?.changePassword) {
              reset();
              setSnackbar({ open: true, message: "Changed password successfully", severity: "success" });
            } else {
              setSnackbar({ open: true, message: "Failed to change password", severity: "error" });
            }
          })}
        >
          <Stack spacing={2}>
            <ControlledTextField<ChangePasswordValues>
              textField={<TextField required label="Current Password" type="password" />}
              name="currentPassword"
            />
            <ControlledTextField<ChangePasswordValues>
              textField={<TextField required label="New Password" type="password" />}
              name="newPassword"
            />
            <ControlledTextField<ChangePasswordValues>
              textField={<TextField required label="Confirm Password" type="password" />}
              name="confirmPassword"
            />
            <Button type="submit">Change Password</Button>
          </Stack>
        </form>
      </FormProvider>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbar((prev) => {
            return { ...prev, open: false };
          });
        }}
        message="Note archived"
      >
        <Alert
          onClose={() => {
            setSnackbar((prev) => {
              return { ...prev, open: false };
            });
          }}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordForm;
