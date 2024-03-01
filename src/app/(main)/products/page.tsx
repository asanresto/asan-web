import { getProducts } from "@/actions/product";
import ProductTable from "@/components/Product/ProductTable";

const Products = async ({ searchParams }: { searchParams: { itemsPerPage?: string; page?: string } }) => {
  const payload = await getProducts({
    itemsPerPage: searchParams.itemsPerPage ? Number(searchParams.itemsPerPage) : 5,
    page: searchParams.page ? Number(searchParams.page) : 0,
  });

  return (
    <ProductTable data={payload.data?.products?.data} paginationMetadata={payload.data?.products?.paginationMetadata} />
  );
};

export default Products;
