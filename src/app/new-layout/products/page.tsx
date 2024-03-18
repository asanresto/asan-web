"use client";

import { Box, Button, InputBase, Stack } from "@mui/material";
import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { operation } from "retry";
import { useQuery } from "urql";

import { ArrowRightIcon, SearchIcon } from "@/assets";
import CustomCheckbox from "@/components/CustomCheckbox";
import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { TableColumnsProps } from "@/components/TableColumns";
import TableFilters, { TableFiltersProps } from "@/components/TableFilters";
import ToggleButton2, { ToggleButton2Props } from "@/components/ToggleButton";
import { getProductsDoc } from "@/graphql/documents/product";
import { Product, ProductsQuery, ProductsQueryVariables } from "@/graphql/types";
import { useDataTable } from "@/hooks/useDataTable";
import { useAppDispatch, useAppSelector } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { themeColors } from "@/theme";
import { FiltersValues } from "@/types";
import { cleanObject, parseQs, stringifyQs } from "@/utils/json";

import ExportPdfButton from "./ExportPdfButton";

const TableColumns = dynamic(() => import("@/components/TableColumns"), { ssr: false });

dayjs.extend(utc);

const paperWidth = 1250;

const getPrintContainer = (iframe: HTMLIFrameElement) => {
  const op = operation();
  return new Promise<HTMLElement>((resolve, reject) => {
    op.attempt(() => {
      const title = iframe.contentDocument?.getElementById("wooohoo");
      const err = !title ? new Error("Not yet") : undefined;
      if (op.retry(err)) {
        return;
      }
      if (title) {
        resolve(title);
      } else {
        reject(op.mainError());
      }
    });
  });
};

const ProductsPage = () => {
  return (
    <Box alignSelf="flex-start" width="100%">
      <Header
        titleText="Products"
        actions={
          <>
            <ExportPdfButton />
            <Button
              LinkComponent={NextLink}
              href="/new-layout/products/create"
              variant="contained"
              color="brown"
              // sx={{ width: "64px", height: "64px", p: 0 }}
            >
              {/* <PlusIcon width="32px" height="32px" /> */}
              Create
            </Button>
          </>
        }
      />
      <Stack p={3} px={6}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          p={2}
          spacing={1}
          borderRadius={8}
          boxShadow="0px 8px 16px rgba(72,52,37,0.05)"
          // bgcolor={themeColors.grey[10]}
        >
          <SearchIcon width="24px" height="24px" />
          <InputBase
            placeholder="Search by Title"
            sx={{ flex: 1, fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em", color: themeColors.brown[80] }}
          />
          <ProductTableColumnsToggle />
          <Suspense>
            <ProductTableFiltersToggle />
          </Suspense>
        </Stack>
        <Suspense>
          <ProductTable />
        </Suspense>
      </Stack>
    </Box>
  );
};

const ProductTableColumnsToggle = () => {
  const open = useAppSelector((state) => {
    return state.boolean[ProductTableColumns.booleanKey];
  });
  const dispatch = useAppDispatch();

  return (
    <ToggleButton2
      isActive={open}
      onClick={() => {
        dispatch(booleanActions.toggle(ProductTableColumns.booleanKey));
        dispatch(booleanActions.off(ProductTableFilters.booleanKey));
      }}
    >
      Columns
    </ToggleButton2>
  );
};

const ProductTableFiltersToggle = (props: ToggleButton2Props) => {
  const open = useAppSelector((state) => {
    return state.boolean[ProductTableFilters.booleanKey];
  });
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  return (
    <ToggleButton2
      isActive={open}
      onClick={() => {
        dispatch(booleanActions.toggle(ProductTableFilters.booleanKey));
        dispatch(booleanActions.off(ProductTableColumns.booleanKey));
      }}
      {...props}
    >
      <Stack direction="row" spacing="4px" alignItems="center">
        {searchParams.get("filters") && (
          <Box width="8px" height="8px" bgcolor={themeColors.orange[60]} borderRadius="9999px" />
        )}
        <div>Filters</div>
      </Stack>
    </ToggleButton2>
  );
};

const ProductTableColumns = (props: TableColumnsProps) => {
  const open = useAppSelector((state) => {
    return state.boolean[ProductTableColumns.booleanKey] && !state.boolean[ProductTableFilters.booleanKey];
  });

  return <TableColumns in={open} {...props} />;
};

ProductTableColumns.booleanKey = "productTableColumns";

const ProductTableFilters = (props: TableFiltersProps) => {
  const open = useAppSelector((state) => {
    return state.boolean[ProductTableFilters.booleanKey] && !state.boolean[ProductTableColumns.booleanKey];
  });

  return <TableFilters in={open} {...props} />;
};

ProductTableFilters.booleanKey = "productTableFilters";

const ProductTable = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: (parseInt(searchParams.get("page") as string) || 1) - 1, // (NaN || 0) = 0
    pageSize: parseInt(searchParams.get("limit") as string) || 10,
  });
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortParam = searchParams.get("sort");
    if (!sortParam) {
      return [];
    }
    return [
      {
        id: sortParam.replace(/^-/, ""),
        desc: sortParam.startsWith("-"),
      },
    ];
  });
  const [globalFilter, setGlobalFilter] = useState<FiltersValues | undefined>(() => {
    const filters = searchParams.get("filters");
    if (!filters) {
      return undefined;
    }
    dispatch(booleanActions.on(ProductTableFilters.booleanKey));
    return parseQs(filters) as FiltersValues;
  });
  const [{ data, fetching, error }, executeQuery] = useQuery<ProductsQuery, ProductsQueryVariables>({
    query: getProductsDoc,
    variables: {
      limit: pagination.pageSize,
      page: pagination.pageIndex + 1,
      sort: sorting[0]?.id ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : undefined,
      filter: globalFilter,
    },
  });

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <CustomCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <CustomCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableHiding: false,
        enableSorting: false,
        meta: {
          sx: {
            "@media print": {
              display: "none",
            },
          },
        },
      },
      {
        accessorKey: "id",
        header: "ID",
        meta: { label: "ID", type: "number" },
      },
      {
        accessorKey: "name",
        header: "Name",
        meta: { label: "Name", type: "string" },
      },
      {
        accessorKey: "price",
        header: "Price",
        meta: { label: "Price", type: "number" },
      },
      {
        accessorKey: "description",
        header: "Description",
        meta: { label: "Description", type: "string" },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: { label: "Status", type: "string" },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => {
          return dayjs(String(info.getValue())).format("MMM DD YYYY, hh:mm A");
        },
        meta: { label: "Created At", type: "date" },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: (info) => {
          return dayjs(String(info.getValue())).format("MMM DD YYYY, hh:mm A");
        },
        meta: { label: "Updated At", type: "date" },
      },
    ],
    [],
  );

  const table = useDataTable<Product>({
    columns: columns,
    // @ts-expect-error
    data: data?.products?.items,
    state: {
      pagination: pagination,
      sorting: sorting,
      globalFilter: globalFilter,
    },
    manualPagination: true, // Use server-side pagination
    manualSorting: true, // Use server-side sorting
    manualFiltering: true,
    rowCount: data?.products?.count ?? 0,
    onPaginationChange: (updaterOrValue) => {
      let newPagination: PaginationState;
      if (typeof updaterOrValue === "function") {
        newPagination = updaterOrValue(pagination);
      } else {
        newPagination = updaterOrValue;
      }
      setPagination(newPagination);
      const params = new URLSearchParams(window.location.search);
      params.set("page", String(newPagination.pageIndex + 1));
      params.set("limit", String(newPagination.pageSize));
      window.history.pushState(null, "", `?${params.toString()}`);
    },
    onSortingChange: (updaterOrValue) => {
      let newSorting: SortingState;
      if (typeof updaterOrValue === "function") {
        newSorting = updaterOrValue(sorting);
      } else {
        newSorting = updaterOrValue;
      }
      setSorting(newSorting);
      table.resetPageIndex();
      const params = new URLSearchParams(window.location.search);
      params.set("sort", (newSorting[0].desc ? "-" : "") + newSorting[0].id);
      window.history.pushState(null, "", `?${params.toString()}`);
    },
    onGlobalFilterChange: (updaterOrValue) => {
      let newGlobalFilter: any;
      if (typeof updaterOrValue === "function") {
        newGlobalFilter = updaterOrValue(globalFilter);
        // @ts-expect-error
        setGlobalFilter(cleanObject(updaterOrValue(globalFilter)));
      } else {
        newGlobalFilter = cleanObject(updaterOrValue);
        // @ts-expect-error
        setGlobalFilter(cleanObject(updaterOrValue));
      }
      const params = new URLSearchParams(window.location.search);
      params.set("filters", stringifyQs(newGlobalFilter));
      window.history.pushState(null, "", `?${params.toString()}`);
    },
  });

  return (
    <>
      <ProductTableColumns table={table} />
      <ProductTableFilters table={table} />
      {fetching ? (
        <Box mt={3} display="flex" justifyContent="center">
          <Loader />
        </Box>
      ) : (
        <>
          {Boolean(data?.products?.items?.length) ? (
            <DataTable
              table={table}
              slotProps={{
                root: { sx: { mt: 3 } },
                TableContainer: {
                  id: "testTable123",
                  sx: {
                    // This is essential for cases where the table's width is expected to overflow
                    "@media print": {
                      overflow: "visible",
                    },
                  },
                },
              }}
            />
          ) : (
            <Stack mt={3} spacing={3} justifyContent="space-between" alignItems="center">
              <Box
                fontSize="16px"
                fontWeight={600}
                letterSpacing="-0.01em"
                color={themeColors.brown[70]}
              >{`No Products found. Either no Products exist yet or none match the filters you've specified above.`}</Box>
              <Button
                LinkComponent={NextLink}
                href="/new-layout/products/create"
                variant="contained"
                color="brown"
                endIcon={<ArrowRightIcon />}
              >
                Create New Product
              </Button>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default ProductsPage;
