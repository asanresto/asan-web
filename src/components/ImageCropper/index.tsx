import { useState } from "react";
import Cropper, { CropperProps, Point } from "react-easy-crop";

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
      {...props}
    />
  );
};

export default ImageCropper;
