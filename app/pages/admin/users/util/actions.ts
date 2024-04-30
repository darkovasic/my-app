"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import type { User, FullUser, ActionError, CreateUserTypes } from "./context";

// const schema = "users";
// const usersRef = collection(db, schema);
const ITEMS_PER_PAGE = 10;

// function toFirebase(formData: FormData, isUpdate: boolean) {
//   const user: UserFirebase = {
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//     email: formData.get("email"),
//     role: formData.get("role"),
//     description: formData.get("description"),
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   };
//   isUpdate ? delete user.createdAt : delete user.updatedAt;
//   return user;
// }

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

export async function createUser(
  data: CreateUserTypes
): Promise<ActionError | undefined> {
  if (!data.password) {
    return { isError: true, message: { title: "Password can not be empty." } };
  }

  if (data.password.length < 6) {
    return {
      isError: true,
      message: { title: "Password must have at leaset 6 characters." },
    };
  }

  if (data.password !== data.confirmPassword) {
    return { isError: true, message: { title: "Passwords do not match." } };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { error } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: `${data.firstName} ${data.lastName}`,
      user_role: data.role,
    },
  });

  if (error) {
    console.log("[createUser] error:", error);
    return {
      isError: true,
      status: error.status,
      message: { title: "Error adding user", description: error.message },
    };
  }

  return { isError: false, message: { title: "User added successfully." } };

  //   try {
  //     const docRef = await addDoc(
  //       collection(db, schema),
  //       toFirebase(formData, false)
  //     );
  //     revalidatePath("/service/users");
  //     return { isError: false, message: "User added successfully." };
  //   } catch (error) {
  //     return { isError: true, message: "Error adding user. Error: " + error };
  //   }
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

export const getFirstUsers = async (pageLimit = ITEMS_PER_PAGE) => {
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

export async function updateUser(formData: FormData): Promise<ActionError> {
  const userId = formData.get("id")?.toString();
  if (userId) {
    const docRef = doc(db, schema, userId);
    await updateDoc(docRef, toFirebase(formData, true));
    revalidatePath("/service/users");
    return { isError: false, message: "User updated successfully." };
  } else {
    return { isError: true, message: "User ID unknown." };
  }
}

export async function searchUsers(term?: string) {
  function createQuery(field: string, value: string) {
    return firestoreQuery(
      usersRef,
      where(field, "==", value),
      orderBy("createdAt", "desc"),
      limit(ITEMS_PER_PAGE)
    );
  }

  if (term) {
    noStore();
    const firstNameQuery = createQuery("firstName", term);
    const lastNameQuery = createQuery("lastName", term);
    const emailQuery = createQuery("email", term);

    const [firstNameSnapshot, lastNameSnapshot, emailSnapshot] =
      await Promise.all([
        getUsersQuery(firstNameQuery),
        getUsersQuery(lastNameQuery),
        getUsersQuery(emailQuery),
      ]);

    const users = [
      ...firstNameSnapshot.users,
      ...lastNameSnapshot.users,
      ...emailSnapshot.users,
    ];

    const uniqueUsers = Array.from(new Set(users.map((user) => user.id))).map(
      (id) => users.find((user) => user.id === id)
    ) as FullUser[];

    return uniqueUsers;
  }
  const { users, totalPages, lastVisible } = await getFirstUsers();
  return users;
}
