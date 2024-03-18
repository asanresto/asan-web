"use client";

import { Box, Button, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import AppDialog from "@/components/AppDialog";
import ImageCropper from "@/components/ImageCropper";
import Slider2 from "@/components/Slider2";
import { ProductValues } from "@/models/product/product";
import { useAppDispatch } from "@/store";
import { booleanActions } from "@/store/slices/boolean";

const ProductImageCropperDialog = () => {
  return null;
  // const dispatch = useAppDispatch();
  // const { setValue, getValues } = useFormContext<CreateProductValues>();

  // return (
  //   <AppDialog booleanKey={ProductImageCropperDialog.booleanKey} fullWidth>
  //     <DialogTitle>Crop</DialogTitle>
  //     <DialogContent>
  //       <ProductImageCropper />
  //     </DialogContent>
  //     <DialogActions>
  //       <Button
  //         onClick={() => {
  //           const t = [...getValues("images")];
  //           t.push(getValues("addingImage"));
  //           setValue("images", t, { shouldDirty: true });
  //           dispatch(booleanActions.off(ProductImageCropperDialog.booleanKey));
  //         }}
  //       >
  //         Confirm
  //       </Button>
  //     </DialogActions>
  //   </AppDialog>
  // );
};

const ProductImageCropper = () => {
  return null;
  // const [zoom, setZoom] = useState(1);
  // const { setValue } = useFormContext<CreateProductValues>();
  // const addingImageUrl = useWatch<CreateProductValues, "addingImage.url">({ name: "addingImage.url", exact: true });

  // return (
  //   <Stack spacing={2}>
  //     <Box position="relative" height="384px" mx="auto" sx={{ aspectRatio: "1/1" }}>
  //       <ImageCropper
  //         image={addingImageUrl ?? undefined}
  //         aspect={1 / 1}
  //         zoom={zoom}
  //         onZoomChange={setZoom}
  //         onCropComplete={(croppedArea, croppedAreaPixels) => {
  //           setValue("addingImage.croppedArea", croppedArea);
  //           setValue("addingImage.croppedAreaPixels", croppedAreaPixels);
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

ProductImageCropperDialog.booleanKey = "productImageCropperDialog";

export default ProductImageCropperDialog;
