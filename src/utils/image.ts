const createImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};

const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180;
};

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const cropImage = async ({
  src,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
}: {
  src: string;
  pixelCrop: { x: number; y: number; width: number; height: number };
  rotation?: number;
  flip?: { horizontal: boolean; vertical: boolean };
}) => {
  const image = await createImage(src);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width, height } = rotateSize(image.width, image.height, rotation);

  // set canvas size to match the bounding box
  canvas.width = width;
  canvas.height = height;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(width / 2, height / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Failed to get canvas context");
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = Math.min(Infinity, pixelCrop.width);
  croppedCanvas.height = pixelCrop.height * (croppedCanvas.width / pixelCrop.width);

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height,
  );

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise<File>((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        reject();
      } else {
        resolve(new File([blob], "file", { type: blob.type }));
      }
    }, "image/webp");
  });
};
