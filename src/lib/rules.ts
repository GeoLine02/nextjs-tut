import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Please enter password" }).trim(),
});

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .max(16, { message: "Not be more then 16 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    repeatPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password fields do not match",
        path: ["repeatPassword"],
      });
    }
  });
