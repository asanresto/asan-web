"use client";

import {
  Box,
  Menu,
  MenuItem,
  Stack,
  StackProps,
  SxProps,
  Table as MuiTable,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { Optional } from "@/types";

import Pagination2 from "../Pagination2";
import TableColumnSortButton from "../TableColumnSortButton";
import ToggleButton2 from "../ToggleButton";

//custom sorting logic for one of our enum columns
// const sortStatusFn: SortingFn<Person> = (rowA, rowB, _columnId) => {
//   const statusA = rowA.original.status;
//   const statusB = rowB.original.status;
//   const statusOrder = ["single", "complicated", "relationship"];
//   return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
// };

export type DataTableProps = {
  slotProps: {
    root?: StackProps;
    TableContainer?: TableContainerProps;
  };
  table: Table<any>;
};

const DataTable = ({ slotProps, table, ...props }: DataTableProps) => {
  // const rerender = useReducer(() => ({}), {})[1];
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [sorting, setSorting] = useState<SortingState>([]);
  // const [rowSelection, setRowSelection] = useState({});

  // const [data, setData] = useState(() => makeData(1_000));
  // const refreshData = () => setData(() => makeData(100_000)); //stress test with 100k rows

  // const table = useReactTable({
  //   debugTable: true,
  //   getCoreRowModel: getCoreRowModel(),
  //   getSortedRowModel: getSortedRowModel(), //client-side sorting
  //   getPaginationRowModel: getPaginationRowModel(),
  //   onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
  //   // sortingFns: {
  //   //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
  //   // },
  //   //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
  //   onRowSelectionChange: setRowSelection,
  //   onColumnVisibilityChange: setColumnVisibility,
  //   autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
  //   // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
  //   enableSorting: true, // - default on/true
  //   enableRowSelection: true,
  //   enableSortingRemoval: false,
  //   // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
  //   // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity,
  //   ...props,
  //   state: {
  //     sorting,
  //     rowSelection,
  //     columnVisibility,
  //     ...props.state,
  //   },
  // });

  //access sorting state from the table instance
  // console.log(table.getState().sorting);

  const pageIndex = table.getState().pagination.pageIndex;
  const from = pageIndex * table.getState().pagination.pageSize + 1;
  const to = from - 1 + table.getRowModel().rows.length;

  return (
    <Stack spacing={3} {...slotProps.root}>
      <TableContainer {...slotProps.TableContainer}>
        <MuiTable>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sx: SxProps | undefined = header.column.columnDef.meta?.sx;
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan} sx={sx}>
                      {header.isPlaceholder ? null : (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <Stack direction="row" spacing="1px">
                              <TableColumnSortButton
                                title="Sort ascending"
                                direction="asc"
                                isActive={header.column.getIsSorted() === "asc"}
                                onClick={() => {
                                  header.column.toggleSorting(false);
                                }}
                              />
                              <TableColumnSortButton
                                title="Sort descending"
                                direction="desc"
                                isActive={header.column.getIsSorted() === "desc"}
                                onClick={() => {
                                  header.column.toggleSorting(true);
                                }}
                              />
                            </Stack>
                          )}
                        </Stack>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const sx: SxProps | undefined = cell.column.columnDef.meta?.sx;
                    return (
                      <TableCell key={cell.id} sx={sx}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
        <Pagination2
          count={table.getPageCount()}
          page={pageIndex + 1}
          onChange={(_, page) => {
            table.setPageIndex(page - 1);
          }}
        />
        <Box flex={1} />
        <Box lineHeight="20px" fontSize="14px" letterSpacing="-0.01em">
          {from}-{to} of {table.getRowCount()}
        </Box>
        <PerPage
          value={table.getState().pagination.pageSize}
          onChange={(value) => {
            table.setPageSize(value);
            // table.options.onPaginationChange?.({ pageIndex: table.getState().pagination.pageIndex, pageSize: value });
          }}
        />
      </Stack>
    </Stack>
    // <div>{table.getRowModel().rows.length.toLocaleString()} Rows</div>
    //   <div>
    //   <button onClick={() => rerender()}>Force Rerender</button>
    // </div>
    // <div>
    //   <button onClick={() => refreshData()}>Refresh Data</button>
    // </div>
    // <pre>{JSON.stringify(sorting, null, 2)}</pre>
  );
};

const PerPage = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const [internalValue, setInternalValue] = useState<number>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div>
      <ToggleButton2
        disableRipple
        variant="text"
        isActive={Boolean(anchorEl)}
        sx={{ bgcolor: "transparent !important" }}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {`Per Page: ${internalValue}`}
      </ToggleButton2>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: "112px",
            },
          },
        }}
      >
        {[5, 10, 25, 50, 100].map((item) => {
          return (
            <MenuItem
              selected={internalValue === item}
              key={item}
              onClick={() => {
                onChange(item);
                setInternalValue(item);
                setAnchorEl(null);
              }}
            >
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default DataTable;
