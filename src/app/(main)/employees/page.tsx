import { getProducts } from "@/actions/product";
import EmployeeTable from "@/components/Employee/EmployeeTable";

const EmployeesPage = async ({ searchParams }: { searchParams: { itemsPerPage?: string; page?: string } }) => {
  const payload = await getProducts({
    itemsPerPage: searchParams.itemsPerPage ? Number(searchParams.itemsPerPage) : 5,
    page: searchParams.page ? Number(searchParams.page) : 0,
  });

  return (
    <EmployeeTable
      data={payload.data?.products?.data}
      paginationMetadata={payload.data?.products?.paginationMetadata}
    />
  );
};

export default EmployeesPage;
