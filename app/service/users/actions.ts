"use server";

import { db } from "@/app/lib/firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
  query as firestoreQuery,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import type { User, FullUser, ActionError } from "./context";

const schema = "users";

export async function createUser(
  formData: FormData
): Promise<ActionError | undefined> {
  try {
    const docRef = await addDoc(collection(db, schema), {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      role: formData.get("role"),
      description: formData.get("description"),
      createdAt: serverTimestamp(),
    });
    revalidatePath("/service/users");
    return { isError: false, message: "User added successfully." };
  } catch (error) {
    return { isError: true, message: "Error adding user. Error: " + error };
  }
}

export async function getUsers(): Promise<FullUser[]> {
  const query = firestoreQuery(
    collection(db, schema),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(query);
  const users: FullUser[] = querySnapshot.docs.map((doc) => {
    const data: User = doc.data();
    return { id: doc.id, ...toUser(data) };
  });
  return users;
}

export async function deleteUser(id: string) {
  await deleteDoc(doc(db, schema, id));
  revalidatePath("/service/users");
  return { message: "User is deleted." };
}

export async function getUser(id: string) {
  const userRef = doc(db, schema, id);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log("User data: ", userSnap.data());
  } else {
    console.log("No such user!");
  }
}

export async function updateUser(formData: FormData) {
  const userId = formData.get("id")?.toString();
  if (userId) {
    const docRef = doc(db, schema, userId);
    // console.log("[updateUser] id", id);
    await updateDoc(docRef, {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      role: formData.get("role"),
      description: formData.get("description"),
      updatedAt: serverTimestamp(),
    });
    revalidatePath("/service/users");
    return { isError: false, message: "User updated successfully." };
  } else {
    return { isError: true, message: "User ID unknown." };
  }
}

function toUser(data: User) {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    description: data.description,
    createdAt: (data.createdAt as Timestamp)?.toDate().toLocaleString(),
    updatedAt: (data.updatedAt as Timestamp)?.toDate().toLocaleString(),
  };
}