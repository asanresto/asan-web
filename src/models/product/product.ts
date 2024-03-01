import { z } from "zod";
import { croppedFileSchema } from "../common";

export const createProductSchema = z.object({
  name: z.string().min(1, "Please fill this field"),
  price: z.coerce.number().min(1, "Please fill this field"),
  description: z.optional(z.string()),
  images: z.array(croppedFileSchema),
  addingImage: z.optional(croppedFileSchema),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.coerce.number(),
  deleteImages: z.optional(z.array(z.number())),
});

export type CreateProductValues = z.infer<typeof createProductSchema>;
export type UpdateProductValues = z.infer<typeof updateProductSchema>;
