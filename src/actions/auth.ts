"use server";

import { getCollection } from "@/lib/db";
import { registerFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");

  if (!userCollection)
    return {
      errors: { email: "server error!", password: [], repeatPassword: "" },
    };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { error: { email: "Email alreadt exist in our database" } };

  const hashedPassword = await bcrypt.hash(password, 10);

  const reseults = await userCollection?.insertOne({
    email,
    password: hashedPassword,
  });

  await createSession(reseults.insertedId.toString());

  redirect("/dashboard");
};
