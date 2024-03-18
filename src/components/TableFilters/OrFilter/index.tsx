import { Collapse } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TransitionGroup } from "react-transition-group";

import { FiltersValues } from "@/types";

import AndFilter, { AndFilterProps } from "../AndFilter";
import FilterText from "../FilterText";

export type OrFilterProps = {
  table: Table<any>;
  orIndex: number;
  onClickRemoveOr: (index: number) => void;
} & Pick<AndFilterProps, "columns">;

const OrFilter = ({ table, orIndex, columns, onClickRemoveOr }: OrFilterProps) => {
  const { getValues } = useFormContext<FiltersValues>();
  const { fields, insert, remove } = useFieldArray<FiltersValues>({ name: `where.or.${orIndex}.and` });

  const onClickAdd = useCallback(
    (index: number) => {
      insert(index + 1, { id: {} });
    },
    [insert],
  );

  const onClickRemove = useCallback(
    (index: number) => {
      remove(index);
      if (fields.length === 1) {
        onClickRemoveOr(orIndex);
      }
      table.setGlobalFilter(getValues());
    },
    [fields.length, getValues, onClickRemoveOr, orIndex, remove, table],
  );

  return (
    <>
      {orIndex > 0 && <FilterText>Or</FilterText>}
      <TransitionGroup>
        {fields.map(({ id }, i) => {
          return (
            <Collapse key={id}>
              <AndFilter
                table={table}
                orIndex={orIndex}
                andIndex={i}
                columns={columns}
                onClickAdd={onClickAdd}
                onClickRemove={onClickRemove}
              />
            </Collapse>
          );
        })}
      </TransitionGroup>
    </>
  );
};

export default OrFilter;
