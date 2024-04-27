"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

export async function signup(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = createClient();

  if (data.password !== data.confirmPassword) {
    return { isError: true, message: "Passwords do not match." };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { isError: true, message: error.message };
  }

  revalidatePath("/", "layout");
  return { isError: false, message: "User added successfully." };
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("[error]: ", error);
    return { isError: true, message: error.message };
  }

  redirect("/auth/login");
}