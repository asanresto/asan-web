import { Box, SxProps, Theme } from "@mui/material";
import { Area } from "react-easy-crop";

const CroppedImage = ({ url, croppedArea }: { url?: string; croppedArea?: Area }) => {
  if (!url) {
    return null;
  }
  let imageStyles: SxProps<Theme> | undefined = undefined;
  if (croppedArea) {
    const scale = 100 / croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale: scale,
    };
    imageStyles = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    };
  }
  return (
    <Box
      component="img"
      src={url}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        transformOrigin: "top left",
        width: "100%",
        height: "auto",
        ...imageStyles,
      }}
    />
  );
};

export default CroppedImage;
