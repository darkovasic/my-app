"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { env } from "process";

export async function login(email: string, password: string) {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("[error]: ", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(process.env.APP_URL + "/pages");
}

export async function signup(
  state: {
    message: string;
  },
  formData: FormData
) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { isError: true, message: "Error adding user. Error: " + error };
    // redirect("/error");
  }

  revalidatePath("/", "layout");
  return { isError: false, message: "User added successfully." };
  // redirect("/");
}
