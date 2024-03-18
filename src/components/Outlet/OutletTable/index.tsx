"use client";

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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const OutletTable = ({ data, paginationMetadata }: { data?: any[]; paginationMetadata?: any }) => {
  const [dense, setDense] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => {
          return <NextLink href={`/outlets/details/${info.row.original.id}`}>{info.getValue() as any}</NextLink>;
        },
      },
      { header: "Address", accessorKey: "address" },
      { header: "Employees" },
      { header: "Sale" },
    ],
    [],
  );
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <>
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
        <Button variant="contained" LinkComponent={NextLink} href="/outlets/create">
          Create Outlet
        </Button>
      </Stack>
      <Paper>
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
          rowsPerPage={Number(searchParams.get("itemsPerPage")) ?? 5}
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
    </>
  );
};

export default OutletTable;
