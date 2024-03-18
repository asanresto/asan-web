import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Please fill this field"),
  price: z.coerce.number().min(1, "Please fill this field"),
  description: z.optional(z.string()),
  images: z.array(
    z.object({
      id: z.optional(z.number()),
      file: z.instanceof(File),
      url: z.string(),
    }),
  ),
  // images: z.array(croppedAreaSchema),
  addingImage: z.optional(z.object({ file: z.instanceof(File), url: z.string() })),
});

export const updateProductSchema = productSchema.extend({
  id: z.coerce.number(),
  deleteImages: z.optional(z.array(z.number())),
});

export type ProductValues = z.infer<typeof productSchema>;
export type UpdateProductValues = z.infer<typeof updateProductSchema>;
