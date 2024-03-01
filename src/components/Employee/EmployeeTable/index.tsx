"use client";

import { PaginationMetadata } from "@/graphql/types";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const EmployeeTable = ({ data, paginationMetadata }: { data?: any[]; paginationMetadata?: PaginationMetadata }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const itemsPerPage = searchParams.get("itemsPerPage");
  const [dense, setDense] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => {
          return <NextLink href={`/products/details/${info.row.original.id}`}>{info.getValue() as any}</NextLink>;
        },
      },
      { header: "Price", accessorKey: "price" },
      { header: "Stock", accessorKey: "stock" },
    ],
    [],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <FormControlLabel
          control={
            <Switch
              checked={dense}
              onChange={(event) => {
                setDense(event.target.checked);
              }}
            />
          }
          label="Dense padding"
        />
        <Button variant="contained" LinkComponent={NextLink} href="/employees/create">
          Create Manager
        </Button>
      </Stack>
      <Paper>
        <Stack direction="row" p={2}>
          <TextField label="Search by name" />
        </Stack>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableCell
                          key={header.id}
                          colSpan={header.colSpan}
                          align={(header.column.columnDef.meta as any)?.align}
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <TableSortLabel
                              active={!!header.column.getIsSorted()}
                              direction={header.column.getIsSorted() === "desc" ? "desc" : "asc"}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getIsSorted() && (
                                <Box component="span" sx={visuallyHidden}>
                                  {header.column.getIsSorted() === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                              )}
                            </TableSortLabel>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    // selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={paginationMetadata?.totalItems ?? 0}
          rowsPerPage={itemsPerPage ? Number(itemsPerPage) : 5}
          page={Number(searchParams.get("page")) ?? 0}
          onPageChange={(event, newPage) => {
            // setPage(newPage);
            const url = new URL(window.location.href);
            url.searchParams.set("page", String(newPage));
            router.replace(url.href);
          }}
          onRowsPerPageChange={(event) => {
            // setItemsPerPage(Number(event.target.value));
            // setPage(0);
            const url = new URL(window.location.href);
            url.searchParams.set("itemsPerPage", event.target.value);
            url.searchParams.set("page", "0");
            router.replace(url.href);
          }}
        />
      </Paper>
      {/* <div>{table.getRowModel().rows.length} Rows</div> */}
      {/* <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div> */}
      {/* <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div> */}
      {/* <pre>{JSON.stringify(sorting, null, 2)}</pre> */}
    </Stack>
  );
};

export default EmployeeTable;
