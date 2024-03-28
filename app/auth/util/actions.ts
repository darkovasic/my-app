"use server";

import { auth } from "@/app/lib/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { UserAuthFirebase } from "./context";

export async function createAuthUser(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    await createUserWithEmailAndPassword(
      auth,
      formData.get("email") as string,
      formData.get("password") as string
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("[UserAuthForm] userCredential: ", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("[UserAuthForm] error: ", errorCode, errorMessage);
      });

    // await updateProfile(auth.currentUser, {
    //   displayName: email,
    // })
    //   .then(() => {
    //     console.log("updated successfully");
    //   })
    //   .catch((error) => {
    //     console.error("error updating name");
    //     console.error(error);
    //   });
    return { isError: false, message: "User added successfully." };
  } catch (error) {
    return { isError: true, message: "Error adding user. Error: " + error };
  }
}

function toFirebase(formData: FormData) {
  const user: UserAuthFirebase = {
    email: formData.get("email")!,
    password: formData.get("password")!,
  };
  return user;
}
