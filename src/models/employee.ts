import { z } from "zod";

import { croppedAreaSchema } from "./common";

export const employeeSchema = z.object({
  name: z.string().min(1, "Please fill this field"),
  email: z.string().min(1, "Please fill this field").email("Please enter a valid email"),
});

export type EmployeeValues = z.infer<typeof employeeSchema>;
