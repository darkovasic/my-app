"use server";

import { db } from "@/app/firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

type FormState = {
  message: string;
};

type User = {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
};

export type FullUser = User & {
  id: string;
};

const schema = "users";

export async function createUser(_prevState: FormState, formData: FormData) {
  try {
    const docRef = await addDoc(collection(db, schema), {
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

export async function getUsers(): Promise<FullUser[]> {
  const querySnapshot = await getDocs(collection(db, schema));
  const users: FullUser[] = querySnapshot.docs.map((doc) => {
    const data: User = doc.data();
    console.log("[getUsers] data", data);
    return { id: doc.id, ...toUser(data) };
  });
  return users;
}

export async function deleteUser(id: string) {
  await deleteDoc(doc(db, schema, id));
  revalidatePath("/service/users");
  return { message: "User is deleted." };
}

function toUser(data: User) {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    createdAt: (data.createdAt as Timestamp)?.toDate().toLocaleString(),
  };
}