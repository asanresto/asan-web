import { Box } from "@mui/material";

import BackButton from "@/components/BackButton";
import OutletForm from "@/components/OutletForm";

const CreateOutletPage = () => {
  return (
    <>
      <BackButton />
      <Box fontSize="32px" fontWeight={700}>
        Create Outlet
      </Box>
      <OutletForm />
    </>
  );
};

export default CreateOutletPage;
