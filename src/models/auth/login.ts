import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Please fill this field").email(),
  password: z.string().min(1, "Please fill this field"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Please fill this field"),
    newPassword: z.string().min(1, "Please fill this field"),
    confirmPassword: z.string().min(1, "Please fill this field"),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.newPassword;
    },
    { message: "Passwords don't match", path: ["confirmPassword"] },
  );

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export type LoginValues = z.infer<typeof loginSchema>;
