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
  orderBy,
  query as firestoreQuery,
  startAt,
  limit,
  getCountFromServer,
} from "firebase/firestore";
// import { cache } from "react";
import { revalidatePath } from "next/cache";
import type { User, FullUser, ActionError, UserRaw } from "./context";
import type {
  Query,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";

const schema = "users";
const coll = collection(db, schema);

function prepareData(formData: FormData, isUpdate: boolean) {
  const user: UserRaw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    role: formData.get("role"),
    description: formData.get("description"),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  isUpdate ? delete user.createdAt : delete user.updatedAt;
  return user;
}

export async function createUser(
  formData: FormData
): Promise<ActionError | undefined> {
  try {
    const docRef = await addDoc(
      collection(db, schema),
      prepareData(formData, false)
    );
    revalidatePath("/service/users");
    return { isError: false, message: "User added successfully." };
  } catch (error) {
    return { isError: true, message: "Error adding user. Error: " + error };
  }
}

const getUsersQuery = async (
  query: Query
): Promise<{ users: FullUser[]; lastVisible: QueryDocumentSnapshot }> => {
  const querySnapshot = await getDocs(query);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const users: FullUser[] = querySnapshot.docs.map((doc) => {
    const data: User = doc.data();
    return { id: doc.id, ...toUserPage(data) };
  });

  return { users, lastVisible };
};

export const getFirstUsers = async (pageLimit = 10) => {
  const count = await getCount();
  const totalPages = Math.ceil(count / pageLimit);

  const first = firestoreQuery(
    collection(db, schema),
    orderBy("createdAt", "desc"),
    limit(pageLimit)
  );

  const { users, lastVisible } = await getUsersQuery(first);

  return { users, totalPages, lastVisible };
};

export const getNextUsers = async (qs: QueryDocumentSnapshot) => {
  // Construct a new query starting at this document,
  // get the next 10 users.
  const next = firestoreQuery(
    collection(db, schema),
    orderBy("createdAt", "desc"),
    startAt(qs),
    limit(10)
  );

  const { users, lastVisible } = await getUsersQuery(next);

  return { users, lastVisible };
};

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
    await updateDoc(docRef, prepareData(formData, true));
    revalidatePath("/service/users");
    return { isError: false, message: "User updated successfully." };
  } else {
    return { isError: true, message: "User ID unknown." };
  }
}

function toUserPage(data: User) {
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

async function getCount(): Promise<number> {
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}