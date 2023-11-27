"use server";

import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";

type FormState = {
  message: string;
};

export async function createUser(prevState: FormState, formData: FormData) {
  console.log("[createUser] formData", formData);
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    });
    console.log("Document written with ID: ", docRef.id);
    return { message: "User is created." };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { message: "Error adding document." };
  }
}
