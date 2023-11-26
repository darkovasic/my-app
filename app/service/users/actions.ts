"use server";

type FormState = {
  message: string;
};

export async function createUser(prevState: FormState, formData: FormData) {
  console.log("[createUser] formData", formData);
  return { message: "Failed to create user" };
}
