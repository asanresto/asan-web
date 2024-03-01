import { CroppedFile } from "@/graphql/types";
import sharp from "sharp";
const cloudinary = require("cloudinary").v2;

export const uploadToCloudinary = async (
  data: CroppedFile,
  { folder, publicId }: { folder: string; publicId?: string },
) => {
  const buffer = await sharp(Buffer.from(await data.file.arrayBuffer()))
    .extract({
      left: data.croppedAreaPixels.x,
      top: data.croppedAreaPixels.y,
      width: data.croppedAreaPixels.width,
      height: data.croppedAreaPixels.height,
    })
    .resize({
      width: Math.min(1500, data.croppedAreaPixels.width),
      height: Math.min(1500, data.croppedAreaPixels.height),
    })
    .toBuffer();
  // const formData = new FormData();
  // formData.append("file", new Blob([buffer]));
  // formData.append("upload_preset", process.env.CLOUDINARY_PRESET);
  // formData.append("folder", folder);
  // if (publicId) {
  //   formData.append("public_id", publicId);
  //   formData.append("overwrite", "true");
  //   formData.append("invalidate", "true");
  // }
  // return new Promise((resolve) => {
  //   cloudinary.uploader
  //     .upload_stream((error: any, uploadResult: any) => {
  //       return resolve(uploadResult);
  //     })
  //     .end([buffer], {
  //       upload_preset: process.env.CLOUDINARY_PRESET,
  //       folder: folder,
  //       public_id: publicId,
  //       overwrite: true,
  //       invalidate: true,
  //     });
  // });

  return cloudinary.uploader.upload(`data:${data.file.type};base64,` + buffer.toString("base64"), {
    upload_preset: process.env.CLOUDINARY_PRESET,
    folder: folder,
    public_id: publicId,
    overwrite: true,
    invalidate: true,
  });

  // return fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
  //   method: "POST",
  //   body: formData,
  // });
};

export const deleteFromCloudinary = async ({ id }: { id: string }) => {
  await cloudinary.uploader.destroy(id);
};
