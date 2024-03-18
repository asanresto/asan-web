import { z } from "zod";

import { croppedAreaSchema } from "./common";

export const accountSchema = z.object({
  name: z.string().min(1, "Please fill this field"),
  email: z.string().min(1, "Please fill this field").email("Please enter a valid email"),
  avatar: z.optional(z.instanceof(File)),
  // selectedAvatarUrl: z.optional(z.string().nullable()),
  // croppedAvatarFile: z.optional(z.instanceof(File)),
  // avatarUrl: z.optional(z.string().nullable()),
  // avatar: z.optional(croppedAreaSchema),
  // deleteAvatar: z.optional(z.boolean()),
});

export type AccountValues = z.infer<typeof accountSchema>;
