"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.back();
      }}
    >
      BACK
    </Button>
  );
};

export default BackButton;
