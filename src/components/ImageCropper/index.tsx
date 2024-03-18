import { alpha } from "@mui/material";
import { useState } from "react";
import Cropper, { CropperProps, Point } from "react-easy-crop";

import { themeColors } from "@/theme";

const ImageCropper = ({ onZoomChange, ...props }: Partial<CropperProps>) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Cropper
      crop={crop}
      zoom={zoom}
      onCropChange={setCrop}
      onZoomChange={(zoom) => {
        setZoom(zoom);
        onZoomChange?.(zoom);
      }}
      showGrid={false}
      maxZoom={4}
      style={{
        cropAreaStyle: {
          color: alpha(themeColors.brown[80], 0.64),
        },
      }}
      {...props}
    />
  );
};

export default ImageCropper;
