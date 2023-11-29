"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/app/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

type FormState = {
  message: string;
};

type User = {
  id: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export async function createUser(prevState: FormState, formData: FormData) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      role: formData.get("role"),
      createdAt: serverTimestamp(),
    });
    revalidatePath("/service/users");
    return { message: "User is created." };
  } catch (e) {
    return { message: "Error adding user." };
  }
}

export async function getUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users: User[] = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return users;
}