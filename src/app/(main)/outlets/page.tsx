import { getOutlets } from "@/actions/outlet";
import OutletTable from "@/components/Outlet/OutletTable";

const Outlets = async ({ searchParams }: { searchParams: { itemsPerPage?: string; page?: string } }) => {
  // const payload = await getOutlets({
  //   itemsPerPage: searchParams.itemsPerPage ? Number(searchParams.itemsPerPage) : 5,
  //   page: searchParams.page ? Number(searchParams.page) : 0,
  // });
  // return (
  // <OutletTable data={payload.data?.outlets.data} paginationMetadata={payload.data?.outlets.paginationMetadata} />
  // );
  return null;
};

export default Outlets;
