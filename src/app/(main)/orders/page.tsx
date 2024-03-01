import { getOrders } from "@/actions/order";
import OrderTable from "@/components/Order/OrderTable";

const Products = async ({ searchParams }: { searchParams: { itemsPerPage?: string; page?: string } }) => {
  const payload = await getOrders({
    itemsPerPage: searchParams.itemsPerPage ? Number(searchParams.itemsPerPage) : 5,
    page: searchParams.page ? Number(searchParams.page) : 0,
  });

  return <OrderTable data={payload.data?.orders?.data} paginationMetadata={payload.data?.orders?.paginationMetadata} />;
};

export default Products;
