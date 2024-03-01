import BackButton from "@/components/BackButton";
import ProductForm from "@/components/Product/CreateProductForm";
import { Box } from "@mui/material";

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
