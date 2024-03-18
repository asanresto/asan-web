import { Box, Button, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import AppDialog from "@/components/AppDialog";
import ImageCropper from "@/components/ImageCropper";
import Slider2 from "@/components/Slider2";
import { AccountValues } from "@/models/account";
import { useAppDispatch } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { cropImage } from "@/utils/image";

const AvatarCropperDialog = () => {
  const dispatch = useAppDispatch();
  const { setValue, getValues } = useFormContext<AccountValues>();

  return (
    <AppDialog booleanKey={AvatarCropperDialog.booleanKey} fullWidth onClose={() => {}}>
      <DialogTitle>Crop</DialogTitle>
      <DialogContent>
        <AvatarCropper />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            // const selectedAvatarUrl = getValues("selectedAvatarUrl");
            // const croppedAreaPixels = getValues("avatar.croppedAreaPixels");
            // if (selectedAvatarUrl && croppedAreaPixels) {
            //   try {
            //     const croppedAvatar = await cropImage({
            //       src: selectedAvatarUrl,
            //       pixelCrop: croppedAreaPixels,
            //     });
            //     setValue("croppedAvatarFile", croppedAvatar);
            //     setValue("avatarUrl", URL.createObjectURL(croppedAvatar));
            //     URL.revokeObjectURL(selectedAvatarUrl);
            //   } catch (error) {
            //     console.error(error);
            //   }
            // }
            // dispatch(booleanActions.off(AvatarCropperDialog.booleanKey));
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </AppDialog>
  );
};

const AvatarCropper = () => {
  return null;
  // const [url, setUrl] = useState<string>();
  // const [zoom, setZoom] = useState(1);
  // const { setValue } = useFormContext<AccountValues>();
  // const selectedAvatarUrl = useWatch<AccountValues, "selectedAvatarUrl">({ name: "selectedAvatarUrl", exact: true });

  // useEffect(() => {
  //   if (avatarFile) {
  //     setUrl(URL.createObjectURL(avatarFile));
  //   } else {
  //     setUrl((prev) => {
  //       if (prev) {
  //         URL.revokeObjectURL(prev);
  //       }
  //       return undefined;
  //     });
  //   }
  // }, [avatarFile]);

  // return (
  //   <Stack spacing={2}>
  //     <Box position="relative" maxHeight="384px" maxWidth="100%" mx="auto" sx={{ aspectRatio: "1/1" }}>
  //       <ImageCropper
  //         image={selectedAvatarUrl ?? undefined}
  //         aspect={1 / 1}
  //         zoom={zoom}
  //         onZoomChange={setZoom}
  //         onCropComplete={(croppedArea, croppedAreaPixels) => {
  //           setValue("avatar.croppedArea", croppedArea, { shouldDirty: true });
  //           setValue("avatar.croppedAreaPixels", croppedAreaPixels, { shouldDirty: true });
  //         }}
  //       />
  //     </Box>
  //     <Slider2
  //       min={1}
  //       max={4}
  //       value={zoom}
  //       marks={[
  //         { value: 1, label: "1x" },
  //         { value: 4, label: "4x" },
  //       ]}
  //       onChange={(_, value) => {
  //         setZoom(value as number);
  //       }}
  //     />
  //   </Stack>
  // );
};

AvatarCropperDialog.booleanKey = "avatarCropperDialog";

export default AvatarCropperDialog;
