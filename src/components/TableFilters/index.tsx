"use client";

import { Box, Collapse, CollapseProps, Stack, StackProps } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { ReactNode, useCallback, useMemo } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { TransitionGroup } from "react-transition-group";

import { PlusSmallIcon } from "@/assets";
import { themeColors } from "@/theme";
import { FiltersValues } from "@/types";

import CircleButton from "../CircleButton";
import TableInputsContainer from "../TableInputsContainer";
import { AndFilterProps } from "./AndFilter";
import OrFilter from "./OrFilter";

export type TableFiltersProps = {
  table: Table<any>;
  onValueChange?: (value: FiltersValues) => void;
} & CollapseProps;

const TableFilters = ({ table, onValueChange, ...props }: TableFiltersProps) => {
  const methods = useForm<FiltersValues>({
    defaultValues: table.getState().globalFilter,
  });
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: "where.or" });

  const columns = useMemo(() => {
    return table.getAllColumns().reduce<AndFilterProps["columns"]>((prev, curr) => {
      if (curr.getCanFilter() && curr.columnDef.meta?.type && curr.columnDef.meta.label) {
        prev.push({ label: curr.columnDef.meta.label, value: curr.id, type: curr.columnDef.meta?.type });
        ``;
      }
      return prev;
    }, []);
  }, [table]);

  const onClickRemoveOr = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <TableInputsContainer {...props}>
      <FormProvider {...methods}>
        <Box
          fontSize="14px"
          fontWeight={800}
          letterSpacing="-0.01em"
          color={themeColors.brown[80]}
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "32px",
            letterSpacing: "-0.01em",
            color: themeColors.brown[80],
          }}
        >
          {fields.length ? "Filter Products where" : "No filters set"}
        </Box>
        <TransitionGroup>
          {fields.map(({ id }, i) => {
            return (
              <Collapse key={id}>
                <OrFilter table={table} orIndex={i} columns={columns} onClickRemoveOr={onClickRemoveOr} />
              </Collapse>
            );
          })}
        </TransitionGroup>
        <AddFilterButton
          label={fields.length ? "Or" : "Add Filter"}
          onClick={() => {
            append({ and: [{ [columns[0].value]: {} }] });
          }}
        />
      </FormProvider>
    </TableInputsContainer>
  );
};

const AddFilterButton = ({ label, onClick, ...props }: { label: ReactNode } & StackProps) => {
  return (
    <Stack
      display="inline-flex"
      alignSelf="flex-start"
      direction="row"
      alignItems="center"
      spacing={1}
      mt={1}
      sx={{ cursor: "pointer" }}
      onClick={onClick}
      {...props}
    >
      <CircleButton Icon={PlusSmallIcon} />
      <Box
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: "32px",
          color: themeColors.brown[80],
        }}
      >
        {label}
      </Box>
    </Stack>
  );
};

export default TableFilters;
