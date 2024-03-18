"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Card,
  CardContent,
  CardMedia,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect } from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { useMutation } from "urql";

import { CloseIcon, UploadIcon } from "@/assets";
import { updateAccountDoc } from "@/graphql/documents/user";
import { UpdateAccountMutation, UpdateAccountMutationVariables } from "@/graphql/types";
import { accountSchema, AccountValues } from "@/models/account";
import { useAppDispatch } from "@/store";
import { booleanActions } from "@/store/slices/boolean";

import ControlledTextField from "../ControlledTextField";
import CroppedImage from "../CroppedImage";
import AvatarCropperDialog from "./AvatarCropperDialog";

const AccountForm = ({ values }: { values?: any | undefined }) => {
  return null;
  // const dispatch = useAppDispatch();
  // const methods = useForm<AccountValues>({
  //   resolver: zodResolver(accountSchema),
  //   // defaultValues: values ? { name: values.name, avatar: { url: values.avatar } } : undefined,
  //   // values: values ? { name: values.name, avatar: { url: values.avatar } } : undefined,
  // });
  // const { handleSubmit, setValue, reset, control } = methods;
  // const [updateAccountResult, updateAccount] = useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(
  //   updateAccountDoc,
  // );
  // const { enqueueSnackbar } = useSnackbar();
  // // const router = useRouter();

  // useEffect(() => {
  //   const beforeUnload = (event: BeforeUnloadEvent) => {
  //     if (control._formState.isDirty) {
  //       event.preventDefault();
  //     }
  //   };
  //   window.addEventListener("beforeunload", beforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnload);
  //   };
  // }, []);

  // return (
  //   <FormProvider {...methods}>
  //     <form
  //       noValidate
  //       onSubmit={handleSubmit(
  //         async (data) => {
  //           console.log(data);
  //           // let avatarUrl;
  //           // if (data.avatarFile && data.avatar?.croppedAreaPixels) {
  //           // avatarFile = await getCroppedImg(URL.createObjectURL(data.file), data.avatar.croppedAreaPixels);
  //           // if (avatarFile) {
  //           //   avatarUrl = URL.createObjectURL(avatarFile);
  //           //   setValue("avatar.url", avatarUrl);
  //           // }
  //           // }
  //           const payload = await updateAccount({
  //             // name: data.name,
  //             // avatar:
  //             //   data.avatar?.file && data.avatar.croppedAreaPixels
  //             //     ? {
  //             //         file: data.avatar.file,
  //             //         croppedAreaPixels: data.avatar.croppedAreaPixels,
  //             //       }
  //             //     : undefined,
  //             avatar: data.croppedAvatarFile,
  //           });
  //           // if (avatarUrl) {
  //           //   URL.revokeObjectURL(avatarUrl);
  //           //   avatarUrl = undefined;
  //           // }
  //           if (payload.data?.updateAccount) {
  //             // router.refresh();
  //             enqueueSnackbar({ message: "Updated account successfully", variant: "success" });
  //           } else {
  //             enqueueSnackbar({ message: "Failed to update account", variant: "error" });
  //           }
  //         },
  //         (errors) => {
  //           console.log(errors);
  //         },
  //       )}
  //     >
  //       <Stack spacing={2}>
  //         <AvatarField label="Profile Picture" imageWidth={140} />
  //         {/* <AvatarField label="Profile Banner" imageWidth={320} /> */}
  //         <ControlledTextField<AccountValues> name="name" textField={<TextField label="Name" fullWidth required />} />
  //         <AvatarCropperDialog />
  //         <SaveButton />
  //       </Stack>
  //     </form>
  //   </FormProvider>
  // );
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

// const UploadedAvatar = ({ initialAvatar }: { initialAvatar?: string }) => {
//   const { setValue, resetField } = useFormContext<AccountValues>();
//   const avatar = useWatch<AccountValues, "avatar">({ name: "avatar" });

//   if (avatar?.url === "removed" || !avatar?.url) {
//     return null;
//   }

//   return (
//     <>
//       {avatar?.url && avatar?.croppedArea ? (
//         <Box position="relative" width="80px" height="80px" overflow="hidden" borderRadius="40px">
//           <CroppedImage url={avatar.url} croppedArea={avatar.croppedArea} />
//         </Box>
//       ) : (
//         <Avatar src={initialAvatar} sx={{ width: "80px", height: "80px" }} />
//       )}
//       {(initialAvatar || avatar?.url) && (
//         <Button
//           onClick={() => {
//             setValue("avatar", { url: null }, { shouldDirty: true });
//           }}
//         >
//           Remove
//         </Button>
//       )}
//     </>
//   );
// };

// const AvatarField = ({ label, imageWidth }: { label: ReactNode; imageWidth: number }) => {
//   const { setValue } = useFormContext<AccountValues>();
//   const dispatch = useAppDispatch();
//   const { enqueueSnackbar } = useSnackbar();

//   const avatarUrl = useWatch<AccountValues, "avatarUrl">({ name: "avatarUrl", exact: true });

//   const hasValidAvatar = avatarUrl && avatarUrl !== "removed";

//   return (
//     <Stack spacing={3}>
//       <Typography>{label}</Typography>
//       {hasValidAvatar ? (
//         <Card variant="outlined" sx={{ display: "flex" }}>
//           <CardMedia component="img" sx={{ width: imageWidth, height: 140 }} image={avatarUrl} />
//           <CardContent sx={{ flex: 1, display: "flex" }}>
//             <Stack flex={1} spacing={2} alignItems="flex-start">
//               <Button variant="contained" size="small" color="inherit">
//                 Update
//               </Button>
//               <Typography variant="caption" color="grey.500">
//                 Must be JPEG, PNG, or WEBP and cannot exceed 10MB.
//               </Typography>
//             </Stack>
//             <Button
//               variant="outlined"
//               sx={{ padding: "5px", minWidth: 0, minHeight: 0, alignSelf: "flex-start" }}
//               onClick={() => {
//                 URL.revokeObjectURL(avatarUrl);
//                 setValue("avatarUrl", "removed", { shouldDirty: true });
//               }}
//             >
//               <CloseIcon width="18px" height="18px" />
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <Button component="label" variant="outlined" startIcon={<UploadIcon width="20px" height="20px" />}>
//           Upload
//           <input
//             type="file"
//             accept="image/png, image/jpeg"
//             className="hidden"
//             onChange={(event) => {
//               const file = event.target.files?.[0];
//               if (file) {
//                 if (file.size > 10 * 1024 * 1024) {
//                   enqueueSnackbar({ message: "File size cannot exceed 10MB", variant: "error" });
//                   return;
//                 }
//                 setValue("selectedAvatarUrl", URL.createObjectURL(file));
//                 dispatch(booleanActions.on(AvatarCropperDialog.booleanKey));
//               }
//             }}
//             onClick={(event) => {
//               event.currentTarget.value = "";
//             }}
//             style={visuallyHidden}
//           />
//         </Button>
//       )}
//     </Stack>
//   );
// };

export default AccountForm;
