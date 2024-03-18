import { Box } from "@mui/material";

import BackButton from "@/components/BackButton";
import ProductForm from "@/components/Product/CreateProductForm";

const CreateProductPage = () => {
  return (
    <>
      <BackButton />
      <Box fontSize="32px" fontWeight={700}>
        Create Product
      </Box>
      <ProductForm />
    </>
  );
};

export default CreateProductPage;
