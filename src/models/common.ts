import { z } from "zod";

export const area = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export const croppedFileSchema = z.object({
  file: z.optional(z.instanceof(File)),
  croppedArea: z.optional(area),
  croppedAreaPixels: z.optional(area),
  url: z.optional(z.string().nullable()),
});
