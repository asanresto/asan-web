import { z } from "zod";

export const outletSchema = z.object({
  name: z.string().min(1, "Please fill this field"),
  address: z.string().min(1, "Please fill this field"),
  schedule: z.object({
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string(),
    sunday: z.string(),
  }),
});

export type OutletValues = z.infer<typeof outletSchema>;
