import { z } from "zod";

export const area = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export const croppedAreaSchema = z.object({
  croppedArea: z.optional(area),
  croppedAreaPixels: z.optional(area),
});
