"use server";

import { registerFormSchema } from "@/lib/rules";

export const register = async (state, formData: FormData) => {
  const validatedFields = registerFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });

  if (!validatedFields.success)
    return {
      email: formData.get("email"),
      errors: validatedFields.error.flatten().fieldErrors,
    };
};
