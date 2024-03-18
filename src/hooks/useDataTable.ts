import {
  ColumnOrderState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

import { Optional } from "@/types";

export const useDataTable = <TData extends RowData>({
  state,
  ...options
}: Optional<TableOptions<TData>, "getCoreRowModel">) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [globalFilter, setGlobalFilter] = useState();

  return useReactTable<TData>({
    debugTable: process.env.NODE_ENV === "development",
    autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
    // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
    enableSorting: true, // - default on/true
    enableRowSelection: true,
    enableSortingRemoval: false,
    enableMultiSort: false,
    // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
    // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnOrder,
      pagination,
      globalFilter,
      ...state,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onGlobalFilterChange: (updaterOrValue) => {
      if (typeof updaterOrValue === "function") {
        setGlobalFilter(updaterOrValue(globalFilter));
      } else {
        setGlobalFilter(updaterOrValue);
      }
    },
    ...options,
  });
};
