"use client";

import { updateAccountDoc } from "@/graphql/documents/user";
import { AccountMutation, AccountMutationVariables } from "@/graphql/types";
import { AccountValues, accountSchema } from "@/models/account";
import { useAppDispatch } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, ButtonProps, Stack, TextField } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { useMutation } from "urql";
import ControlledTextField from "../ControlledTextField";
import CroppedImage from "../CroppedImage";
import AvatarCropperDialog from "./AvatarCropperDialog";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const AccountForm = ({ values }: { values?: any | undefined }) => {
  const dispatch = useAppDispatch();
  const methods = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: values ? { name: values.name, avatar: { url: values.avatar } } : undefined,
    values: values ? { name: values.name, avatar: { url: values.avatar } } : undefined,
  });
  const { handleSubmit, setValue, reset } = methods;
  const [updateAccountResult, updateAccount] = useMutation<AccountMutation, AccountMutationVariables>(updateAccountDoc);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={handleSubmit(
          async (data) => {
            const payload = await updateAccount({
              name: data.name,
              avatar:
                data.avatar?.file && data.avatar.croppedAreaPixels
                  ? {
                      file: data.avatar.file,
                      croppedAreaPixels: data.avatar.croppedAreaPixels,
                    }
                  : undefined,
            });
            if (payload.data) {
              router.refresh();
              enqueueSnackbar({ message: "Created product successfully", variant: "success" });
            } else {
              enqueueSnackbar({ message: "Failed to create product", variant: "error" });
            }
          },
          (errors) => {
            console.log(errors);
          },
        )}
      >
        <div>
          <ControlledTextField<AccountValues> name="name" textField={<TextField label="Name" />} />
        </div>
        <Stack direction="row" spacing={2} alignItems="center">
          <UploadedAvatar initialAvatar={values?.avatar} />
          <Button component="label" variant="outlined">
            Upload
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setValue("avatar.file", file);
                  setValue("avatar.url", URL.createObjectURL(file));
                  dispatch(booleanActions.on(AvatarCropperDialog.booleanKey));
                }
              }}
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
              style={visuallyHidden}
            />
          </Button>
        </Stack>
        <AvatarCropperDialog />
        <SaveButton disabled={updateAccountResult.fetching} />
        <DiscardButton
          onClick={() => {
            reset({ name: values.name, avatar: { url: values.avatar } });
          }}
        />
      </form>
    </FormProvider>
  );
};

const SaveButton = ({ disabled, ...props }: ButtonProps) => {
  const { formState } = useFormContext<AccountValues>();

  return (
    <Button type="submit" variant="contained" disabled={!formState.isDirty || disabled} {...props}>
      Save
    </Button>
  );
};

const DiscardButton = (props: ButtonProps) => {
  const { formState } = useFormContext<AccountValues>();
  if (!formState.isDirty) {
    return null;
  }

  return <Button {...props}>Discard</Button>;
};

const UploadedAvatar = ({ initialAvatar }: { initialAvatar?: string }) => {
  const { setValue, resetField } = useFormContext<AccountValues>();
  const avatar = useWatch<AccountValues, "avatar">({ name: "avatar" });

  if (avatar?.url === "removed" || !avatar?.url) {
    return null;
  }

  return (
    <>
      {avatar?.url && avatar?.croppedArea ? (
        <Box position="relative" width="80px" height="80px" overflow="hidden" borderRadius="40px">
          <CroppedImage url={avatar.url} croppedArea={avatar.croppedArea} />
        </Box>
      ) : (
        <Avatar src={initialAvatar} sx={{ width: "80px", height: "80px" }} />
      )}
      {(initialAvatar || avatar?.url) && (
        <Button
          onClick={() => {
            setValue("avatar", { url: null }, { shouldDirty: true });
          }}
        >
          Remove
        </Button>
      )}
    </>
  );
};

export default AccountForm;
