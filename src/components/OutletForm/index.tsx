"use client";

import { createOutletDoc } from "@/graphql/documents/outlet";
import { CreateOutletMutation, CreateOutletMutationVariables } from "@/graphql/types";
import { OutletValues, outletSchema } from "@/models/outlet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Switch, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "notistack";
import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { useMutation } from "urql";
import ControlledTextField from "../ControlledTextField";
import ProductImageCropperDialog from "./ProductImageCropperDialog";

type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

const weekDays: { value: DayOfWeek; label: ReactNode }[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const OutletForm = ({ variant = "create" }: { variant?: "create" | "update" }) => {
  const methods = useForm<OutletValues>({
    resolver: zodResolver(outletSchema),
    defaultValues: {
      schedule: {
        monday: "08:00:AM-09:00:PM",
        tuesday: "08:00:AM-09:00:PM",
        wednesday: "08:00:AM-09:00:PM",
        thursday: "08:00:AM-09:00:PM",
        friday: "08:00:AM-09:00:PM",
        saturday: "08:00:AM-09:00:PM",
        sunday: "08:00:AM-09:00:PM",
      },
    },
  });
  const { handleSubmit } = methods;
  const [result, createOutlet] = useMutation<CreateOutletMutation, CreateOutletMutationVariables>(createOutletDoc);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const payload = await createOutlet({ name: data.name, address: data.address, schedule: data.schedule });
          if (payload.data?.createOutlet) {
            enqueueSnackbar({ message: "Created outlet successfully", variant: "success" });
          } else {
            enqueueSnackbar({ message: "Failed to create outlet", variant: "error" });
          }
        })}
      >
        <Stack spacing={2}>
          <ControlledTextField<OutletValues> textField={<TextField required label="Name" />} name="name" />
          <ControlledTextField<OutletValues> textField={<TextField required label="Address" />} name="address" />
          <Box>Schedule</Box>
          <Stack spacing={2} direction="row" flexWrap="wrap">
            {weekDays.map((item, index) => {
              return <WeekDayItem key={index} {...item} />;
            })}
          </Stack>
          <Box>Manager</Box>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button>Cancel</Button>
            <Button autoFocus type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </Stack>
      </form>
      <ProductImageCropperDialog />
    </FormProvider>
  );
};

const WeekDayItem = ({ value, label }: { value: DayOfWeek; label: ReactNode }) => {
  const name = `schedule.${value}` as const;
  const weekDayValue = useWatch<OutletValues, typeof name>({ name: name, exact: true });
  const open = weekDayValue?.replace("_", "").split("-")[0];
  const close = weekDayValue?.replace("_", "").split("-")[1];
  const checked = !weekDayValue?.startsWith("_"); // Starts with '_' means the store is closed on that day
  const { setValue, getValues } = useFormContext<OutletValues>();

  const onChange = (value: Dayjs | null, time: "open" | "close") => {
    if (!value) {
      return;
    }
    const formatted = value.format("hh:mm:A");
    if (time === "open") {
      setValue(name, formatted + "-" + close);
    } else {
      setValue(name, open + "-" + formatted);
    }
  };

  return (
    <Stack spacing={1} flex={1} flexBasis="136px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {label}
        <Switch
          checked={checked}
          size="small"
          onChange={(_, checked) => {
            if (checked) {
              setValue(name, getValues(name).replace("_", ""));
            } else {
              setValue(name, "_" + getValues(name));
            }
          }}
        />
      </Stack>
      <TimePicker
        label="From"
        disabled={!checked}
        value={open ? dayjs(open, "hh:mm:A") : null}
        onChange={(value) => {
          onChange(value, "open");
        }}
      />
      <TimePicker
        label="To"
        disabled={!checked}
        value={close ? dayjs(close, "hh:mm:A") : null}
        onChange={(value) => {
          onChange(value, "close");
        }}
      />
    </Stack>
  );
};

export default OutletForm;
