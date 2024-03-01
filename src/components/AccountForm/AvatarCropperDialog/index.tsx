import AppDialog from "@/components/AppDialog";
import ImageCropper from "@/components/ImageCropper";
import Slider2 from "@/components/Slider2";
import { AccountValues } from "@/models/account";
import { useAppDispatch } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { Box, Button, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const AvatarCropperDialog = () => {
  const dispatch = useAppDispatch();
  const { setValue } = useFormContext<AccountValues>();

  return (
    <AppDialog
      booleanKey={AvatarCropperDialog.booleanKey}
      fullWidth
      onClose={() => {
        setValue("avatar", undefined);
      }}
    >
      <DialogTitle>Crop</DialogTitle>
      <DialogContent>
        <AvatarCropper />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(booleanActions.off(AvatarCropperDialog.booleanKey));
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </AppDialog>
  );
};

const AvatarCropper = () => {
  const [zoom, setZoom] = useState(1);
  const { setValue } = useFormContext<AccountValues>();
  const addingImageUrl = useWatch<AccountValues, "avatar.url">({ name: "avatar.url", exact: true });

  return (
    <Stack spacing={2}>
      <Box position="relative" height="384px" mx="auto" sx={{ aspectRatio: "1/1" }}>
        <ImageCropper
          image={addingImageUrl ?? undefined}
          aspect={1 / 1}
          zoom={zoom}
          onZoomChange={setZoom}
          onCropComplete={(croppedArea, croppedAreaPixels) => {
            setValue("avatar.croppedArea", croppedArea, { shouldDirty: true });
            setValue("avatar.croppedAreaPixels", croppedAreaPixels, { shouldDirty: true });
          }}
        />
      </Box>
      <Slider2
        min={1}
        max={4}
        value={zoom}
        marks={[
          { value: 1, label: "1x" },
          { value: 4, label: "4x" },
        ]}
        onChange={(_, value) => {
          setZoom(value as number);
        }}
      />
    </Stack>
  );
};

AvatarCropperDialog.booleanKey = "avatarCropperDialog";

export default AvatarCropperDialog;
