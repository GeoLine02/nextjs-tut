"use server";

import { getCollection } from "@/lib/db";
import { loginFormSchema, registerFormSchema } from "@/lib/rules";
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

export const login = async (state, formData: FormData) => {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: { email: "Server error!", password: "" },
    };
  }

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser)
    return { errors: { email: "Invalid credentials!", password: "" } };

  const matchedPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchedPassword) {
    return { errors: { email: "Invalid credentials", password: "" } };
  }

  await createSession(existingUser._id.toString());

  redirect("/dashboard");
};
