"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function login(email: string, password: string) {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("[error]: ", error);
    return { isError: true, message: error.message };
  }

  revalidatePath("/", "layout");
}

export async function signup(
  state: {
    isError: boolean;
    message: string;
  },
  formData: FormData
) {
  const supabase = createClient();

  if (formData.get("password") !== formData.get("confirm_password")) {
    return { isError: true, message: "Passwords do not match." };
  }

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  console.log("auth actios1: ", error?.message);
  if (error) {
    console.log("auth actios2: ", error.message);
    return { isError: true, message: error.message };
    // redirect("/error");
  }

  revalidatePath("/", "layout");
  return { isError: false, message: "User added successfully." };
  // redirect("/");
}
