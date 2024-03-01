import { getProduct } from "@/actions/product";
import BackButton from "@/components/BackButton";
import ProductStock from "@/components/Product/ProductStock";
import UpdateProductForm from "@/components/Product/UpdateProductForm";
import { Box, Stack } from "@mui/material";

const toString = (o: Record<string, any> | undefined | null) => {
  if (o === undefined || o === null) {
    return o;
  }
  Object.keys(o).forEach((k) => {
    if (typeof o[k] === "object") {
      return toString(o[k]);
    }
    o[k] = "" + o[k];
  });
  return o;
};

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const payload = await getProduct({
    id: Number(params.id),
  });

  return (
    <Stack spacing={2} alignItems="flex-start">
      <BackButton />
      <UpdateProductForm values={toString(payload.data?.product)} />
      <Box>Stock</Box>
      <ProductStock />
    </Stack>
  );
};

export default ProductDetailsPage;
