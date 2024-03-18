import "@tanstack/react-table";

import { SxProps } from "@mui/material";

import { TableColumnType } from ".";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    sx?: SxProps;
    type?: TableColumnType;
  }
}
