import { debounce, Stack } from "@mui/material";
import { Table } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { CloseSmallIcon, PlusSmallIcon } from "@/assets";
import CircleButton from "@/components/CircleButton";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomTextField from "@/components/CustomTextField";
import { FilterConditions, FiltersValues, TableColumnType } from "@/types";

import FilterText from "../FilterText";

const FILTER_CONDITION_LABELS: Record<FilterConditions, string> = {
  [FilterConditions.Equals]: "equals",
  [FilterConditions.NotEquals]: "not equals",
  [FilterConditions.In]: "in",
  [FilterConditions.NotIn]: "not in",
  [FilterConditions.Exists]: "exists",
  [FilterConditions.Like]: "is like",
  [FilterConditions.Contains]: "contains",
  [FilterConditions.Greater]: "is greater than",
  [FilterConditions.Less]: "is less than",
  [FilterConditions.GreaterOrEqual]: "is greater than or equal to",
  [FilterConditions.LessOrEqual]: "is less than or equal to",
};

const FILTER_CONDITION_OPTIONS = Object.values(FilterConditions).map((item) => ({
  label: FILTER_CONDITION_LABELS[item],
  value: item,
}));

const getFilterConditionOptions = (type: TableColumnType) => {
  switch (type) {
    case "number":
    case "date":
      return FILTER_CONDITION_OPTIONS.filter((item) => {
        return ![FilterConditions.Like, FilterConditions.Contains].includes(item.value);
      });
    case "string":
      return FILTER_CONDITION_OPTIONS.filter((item) => {
        return ![
          FilterConditions.Greater,
          FilterConditions.Less,
          FilterConditions.GreaterOrEqual,
          FilterConditions.LessOrEqual,
        ].includes(item.value);
      });
  }
};

export type AndFilterColumn = { label: string; value: string; type: TableColumnType };

export type AndFilterProps = {
  orIndex: number;
  andIndex: number;
  columns: AndFilterColumn[];
  table: Table<any>;
  onClickAdd: (index: number) => void;
  onClickRemove: (index: number) => void;
};

const AndFilter = ({ table, orIndex, andIndex, columns, onClickAdd, onClickRemove }: AndFilterProps) => {
  const { getValues, setValue } = useFormContext<FiltersValues>();
  const name = `where.or.${orIndex}.and.${andIndex}` as const;
  const andFilter = useWatch<FiltersValues, typeof name>({ name: name }); // andFilter should be like this {id: {equals: 1}}

  let filterColumn: string | undefined;
  let filterCondition: FilterConditions | undefined;
  let filterValue: string | number | undefined;
  if (andFilter) {
    filterColumn = Object.keys(andFilter)[0]; // should be id
    filterCondition = Object.keys(andFilter[filterColumn])[0] as FilterConditions; // should be equals
    filterValue = andFilter[filterColumn][filterCondition]; // should be 1
  }

  const type = columns.find((item) => item.value === filterColumn)?.type;

  const debouncedSetGlobalFilter = useCallback(
    debounce(() => {
      table.setGlobalFilter(getValues());
    }, 1000),
    [table],
  );

  if (!type) {
    return null;
  }

  return (
    <Stack spacing={1}>
      {andIndex > 0 && <FilterText>And</FilterText>}
      <Stack direction="row" alignItems="center" spacing={3}>
        <CustomAutoComplete<AndFilterColumn>
          size="small"
          variant="outlined"
          disableClearable
          placeholder="Select a value"
          options={columns}
          defaultValue={columns[0]}
          value={columns.find((item) => item.value === filterColumn)}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          sx={{ flex: 1 }}
          onChange={(_, value) => {
            if (!value) {
              return;
            }
            setValue(name, { [value.value]: {} });
          }}
        />
        <CustomAutoComplete
          size="small"
          variant="outlined"
          disableClearable
          placeholder="Select a value"
          options={getFilterConditionOptions(type)}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          sx={{ flex: 1 }}
          // @ts-expect-error
          value={filterCondition ? FILTER_CONDITION_OPTIONS.find((item) => item.value === filterCondition) : null}
          onChange={(_, value) => {
            if (!filterColumn) {
              return;
            }
            setValue(name, {
              [filterColumn]: {
                [value.value]:
                  filterValue !== "" && filterValue !== null && filterValue !== undefined ? filterValue : "",
              },
            });
            setTimeout(() => {
              if (filterValue) {
                table.options.onGlobalFilterChange?.(getValues());
              }
            });
          }}
        />
        {type === "date" ? (
          <CustomDatePicker
            format="MMM DD YYYY"
            value={filterValue ? dayjs(filterValue) : null}
            disabled={!filterCondition}
            sx={{ flex: 1 }}
            onChange={(value) => {
              if (!filterColumn || !filterCondition) {
                return;
              }
              setValue(name, { [filterColumn]: { [filterCondition]: value ? value.format() : "" } });
              if (value) {
                debouncedSetGlobalFilter();
              }
            }}
          />
        ) : (
          <CustomTextField
            disabled={!filterCondition}
            value={filterValue ?? ""}
            sx={{ flex: 1 }}
            onChange={(event) => {
              if (!filterColumn || !filterCondition) {
                return;
              }
              setValue(name, { [filterColumn]: { [filterCondition]: castValue(type, event.target.value) } });
              if (event.target.value) {
                debouncedSetGlobalFilter();
              }
            }}
          />
        )}
        <Stack direction="row" alignItems="center" spacing={1}>
          <CircleButton
            Icon={CloseSmallIcon}
            onClick={() => {
              onClickRemove?.(andIndex);
            }}
          />
          <CircleButton
            Icon={PlusSmallIcon}
            onClick={() => {
              onClickAdd?.(andIndex);
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const castValue = (type: TableColumnType, value: string) => {
  switch (type) {
    case "number":
      return Number(value);
    default:
      return value;
  }
};

export default AndFilter;
