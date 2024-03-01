import BackButton from "@/components/BackButton";
import EmployeeForm from "@/components/Employee/EmployeeForm";
import { Box } from "@mui/material";

const CreateProductPage = () => {
  return (
    <>
      <BackButton />
      <Box fontSize="32px" fontWeight={700}>
        Create Manager
      </Box>
      <EmployeeForm />
    </>
  );
};

export default CreateProductPage;
