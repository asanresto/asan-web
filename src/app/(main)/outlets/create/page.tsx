import BackButton from "@/components/BackButton";
import OutletForm from "@/components/OutletForm";
import { Box } from "@mui/material";

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
