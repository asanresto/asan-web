import { z } from "zod";
import { croppedFileSchema } from "./common";

export const accountSchema = z.object({
  name: z.string().min(1, "Please fill this field"),
  avatar: z.optional(croppedFileSchema),
  deleteAvatar: z.optional(z.boolean()),
});

export type AccountValues = z.infer<typeof accountSchema>;
