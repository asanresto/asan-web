import { Box } from "@mui/material";

import BackButton from "@/components/BackButton";
import EmployeeForm from "@/components/Employee/EmployeeForm";

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
