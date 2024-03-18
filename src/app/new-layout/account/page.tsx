"use client";

import { alpha, Backdrop, Box, Button, InputLabel, Stack } from "@mui/material";
import NextImage, { ImageProps } from "next/image";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "urql";

import { CalendarIcon, CloseIcon } from "@/assets";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import Header from "@/components/Header";
import MiniPillButton from "@/components/MiniPillButton";
import TextField2 from "@/components/TextFields2";
import Upload from "@/components/Upload";
import { getMeDoc, updateAccountDoc } from "@/graphql/documents/user";
import { MeQuery, MeQueryVariables, UpdateAccountMutation, UpdateAccountMutationVariables } from "@/graphql/types";
import { AccountValues } from "@/models/account";
import { useAppDispatch, useAppSelector } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { themeColors } from "@/theme";
import theme from "@/theme/theme";

const AccountPage = () => {
  const [{ data, fetching, error }, executeQuery] = useQuery<MeQuery, MeQueryVariables>({
    query: getMeDoc,
  });
  const [updateAccountResult, updateAccount] = useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(
    updateAccountDoc,
  );
  const dispatch = useAppDispatch();
  const methods = useForm<AccountValues>({
    values: data?.me ? { name: data.me.name ?? "", email: data.me.email ?? "" } : undefined,
  });

  return (
    <>
      <FormProvider {...methods}>
        <Header
          titleText={<Title />}
          actions={
            <>
              <Button variant="outlined" color="brown">
                Change Password
              </Button>
              <Button
                variant="contained"
                color="brown"
                onClick={methods.handleSubmit(
                  async (data) => {
                    await updateAccount({ name: data.name, avatar: data.avatar });
                  },
                  (errors) => {
                    console.error(errors);
                  },
                )}
              >
                Save
              </Button>
            </>
          }
        />
        <Stack m={3} mx={6} spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            p={2}
            spacing={1}
            borderRadius={8}
            boxShadow="0px 8px 16px rgba(72,52,37,0.05)"
            fontSize="16px"
            fontWeight={700}
            lineHeight="32px"
            letterSpacing="-0.01em"
            color={alpha(themeColors.brown[80], 0.42)}
          >
            <Stack direction="row" spacing={3}>
              <Box>
                Last modified:{" "}
                <Box component="span" color={themeColors.brown[80]}>
                  July 16th 2024, 5:33 PM
                </Box>
              </Box>
              <Box>
                Created:{" "}
                <Box component="span" color={themeColors.brown[80]}>
                  July 16th 2024, 5:33 PM
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <Controller<AccountValues>
              name="name"
              render={({ field: { ref, ...field } }) => {
                return (
                  <TextField2
                    label="Name"
                    variant="filled"
                    required
                    placeholder="Enter product name"
                    inputRef={ref}
                    {...field}
                  />
                );
              }}
            />
            <Controller<AccountValues>
              name="email"
              render={({ field: { ref, ...field } }) => {
                return (
                  <TextField2
                    label="Email"
                    variant="filled"
                    required
                    placeholder="Enter product name"
                    inputRef={ref}
                    {...field}
                  />
                );
              }}
            />
            <div>
              <InputLabel
                sx={{ fontSize: "14px", fontWeight: 800, mb: "8px", lineHeight: "16px", color: themeColors.brown[80] }}
              >
                Avatar
              </InputLabel>
              <Controller<AccountValues, "avatar">
                name="avatar"
                render={({ field: { value, onChange } }) => {
                  return (
                    <Stack direction="row" spacing={1}>
                      <Upload
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event.target.files?.[0]);
                          dispatch(booleanActions.on(FullScreenImage.booleanKey));
                        }}
                      >
                        {Boolean(data?.me?.avatarUrl || value) && (
                          <AccountAvatar
                            src={data?.me?.avatarUrl ?? URL.createObjectURL(value!)}
                            alt={data?.me?.name ?? ""}
                          />
                        )}
                      </Upload>
                      {data?.me?.avatarUrl && (
                        <Stack direction="row" alignItems="flex-start" spacing={1}>
                          <MiniPillButton sx={{ px: "15px" }}>Change</MiniPillButton>
                          <MiniPillButton
                            sx={{ px: "15px" }}
                            onClick={() => {
                              methods.setValue("avatar", undefined);
                            }}
                          >
                            Remove
                          </MiniPillButton>
                        </Stack>
                      )}
                    </Stack>
                  );
                }}
              />
            </div>
            <CustomAutoComplete<{ label: string; value: string }>
              size="medium"
              variant="filled"
              label="Role"
              disableClearable
              placeholder="Select a value"
              options={[{ label: "Super Admin", value: "SA" }]}
              defaultValue={{ label: "Super Admin", value: "SA" }}
              // value={columns.find((item) => item.value === filterColumn)}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
              sx={{
                flex: 1,
              }}
            />
            <CustomAutoComplete<{ label: string; value: string }>
              size="medium"
              variant="filled"
              label="Status"
              disableClearable
              placeholder="Select a value"
              options={[
                { label: "Active", value: "ACTIVE" },
                { label: "Disabled", value: "DISABLED" },
              ]}
              defaultValue={{ label: "Active", value: "ACTIVE" }}
              // value={columns.find((item) => item.value === filterColumn)}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
              sx={{
                flex: 1,
              }}
            />
          </Stack>
        </Stack>
      </FormProvider>
      <Box px={6} borderTop={`1px solid ${themeColors.brown[30]}`} py={3}>
        <Box fontSize="24px" fontWeight={800} lineHeight="32px" letterSpacing="-0.02em" color={themeColors.brown[80]}>
          App Settings
        </Box>
        <Stack spacing={4} mt={3}>
          <CustomAutoComplete<{ label: string; value: string }>
            size="medium"
            variant="filled"
            disableClearable
            placeholder="Select a value"
            options={[{ label: "English", value: "en" }]}
            defaultValue={{ label: "English", value: "en" }}
            // value={columns.find((item) => item.value === filterColumn)}
            isOptionEqualToValue={(option, value) => {
              return option.value === value.value;
            }}
            sx={{
              flex: 1,
            }}
          />
        </Stack>
      </Box>
      {/* <FullScreenImage /> */}
    </>
  );
};

const FullScreenImage = () => {
  const isOpen = useAppSelector((state) => {
    return Boolean(state.boolean[FullScreenImage.booleanKey]);
  });
  const dispatch = useAppDispatch();

  return (
    <Backdrop open={isOpen}>
      <NextImage
        draggable={false}
        fill
        src={"http://localhost:9000/asan/6e0af7f6-0db6-4791-8230-acd54a671dc9"}
        alt={""}
        style={{ objectFit: "contain" }}
      />
      <Button
        variant="contained"
        color="brown"
        sx={{
          minWidth: "36px",
          minHeight: "36px",
          p: 0,
          position: "absolute",
          top: "24px",
          right: "24px",
        }}
        onClick={() => {
          dispatch(booleanActions.off(FullScreenImage.booleanKey));
        }}
      >
        <CloseIcon />
      </Button>
    </Backdrop>
  );
};

FullScreenImage.booleanKey = "fullScreenImage";

const AccountAvatar = ({ style, ...props }: ImageProps) => {
  return (
    <Box
      position="relative"
      width="220px"
      height="220px"
      borderRadius={7}
      bgcolor={themeColors.brown[10]}
      sx={{ cursor: "zoom-in" }}
    >
      <NextImage fill {...props} style={{ objectFit: "cover", borderRadius: "28px", ...style }} />
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        border={`1px solid transparent`}
        borderRadius={7}
        display="grid"
        sx={{
          placeItems: "center",
          transition: theme.transitions.create(["border", "box-shadow"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          "&:hover": {
            borderColor: themeColors.brown[40],
          },
          "&:active": {
            borderColor: themeColors.brown[80],
            boxShadow: `${alpha(themeColors.brown[80], 0.2)} 0 0 0 4px}`,
          },
        }}
      />
    </Box>
  );
};

const Title = () => {
  const [name, email] = useWatch<AccountValues>({ name: ["name", "email"] });

  return <>{name || email}</>;
};

export default AccountPage;
