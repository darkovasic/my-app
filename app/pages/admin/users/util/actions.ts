"use server";

import { createClient, type User as SupabaseUser } from "@supabase/supabase-js";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import type { User, FullUser, ActionError, UserTypes } from "./context";

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

function toUserPage(data: SupabaseUser) {
  return {
    firstName: data.user_metadata.first_name,
    lastName: data.user_metadata.last_name,
    email: data.email,
    role: data.role,
    // description: data.description,
    createdAt: new Date(data.created_at).toLocaleString(),
    updatedAt: data.updated_at
      ? new Date(data.updated_at).toLocaleString()
      : "",
  };
}

export async function createUser(
  data: UserTypes
): Promise<ActionError | undefined> {
  try {
    if (!data.password) {
      throw new Error("Please enter password for this user.");
    }

    if (data.password.length < 6) {
      throw new Error("Password must have at leaset 6 characters.");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match.");
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
        first_name: data.firstName,
        last_name: data.lastName,
        full_name: `${data.firstName} ${data.lastName}`,
        user_role: data.role,
      },
    });

    if (error) {
      return {
        isError: true,
        status: error.status,
        message: { title: "Error adding user", description: error.message },
      };
    }

    revalidatePath("/pages/service/users");
    return { isError: false, message: { title: "User added successfully." } };
  } catch (error) {
    return { isError: true, message: { title: `${error}` } };
  }
}

// const getUsersQuery = async (
//   query: Query
// ): Promise<{ users: FullUser[]; lastVisible: QueryDocumentSnapshot }> => {
//   const querySnapshot = await getDocs(query);
//   const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//   const users: FullUser[] = querySnapshot.docs.map((doc) => {
//     const data: User = doc.data();
//     return { id: doc.id, ...toUserPage(data) };
//   });

//   return { users, lastVisible };
// };

// export const getFirstUsers = async (pageLimit = ITEMS_PER_PAGE) => {
//   const count = await getCount();
//   const totalPages = Math.ceil(count / pageLimit);

//   const first = firestoreQuery(
//     collection(db, schema),
//     orderBy("createdAt", "desc"),
//     limit(pageLimit)
//   );

//   const { users, lastVisible } = await getUsersQuery(first);

//   return { users, totalPages, lastVisible };
// };

// export const getNextUsers = async (qs: QueryDocumentSnapshot) => {
//   const next = firestoreQuery(
//     collection(db, schema),
//     orderBy("createdAt", "desc"),
//     startAt(qs),
//     limit(10)
//   );

//   const { users, lastVisible } = await getUsersQuery(next);

//   return { users, lastVisible };
// };

export async function deleteUser(id: string) {
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

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    return {
      isError: true,
      status: error.status,
      message: { title: "Error adding user", description: error.message },
    };
  }

  revalidatePath("/service/users");
  return { message: { title: "User is deleted." } };
}

export async function getUser(id: string) {
  // const userRef = doc(db, schema, id);
  // const userSnap = await getDoc(userRef);
  // if (userSnap.exists()) {
  //   console.log("User data: ", userSnap.data());
  // } else {
  //   console.log("No such user!");
  // }
}

export async function updateUser(data: UserTypes): Promise<ActionError> {
  if (data.id) {
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

    const { error } = await supabase.auth.admin.updateUserById(data.id, {
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        first_name: data.firstName,
        last_name: data.lastName,
        full_name: `${data.firstName} ${data.lastName}`,
        user_role: data.role,
      },
    });

    if (error) {
      return {
        isError: true,
        status: error.status,
        message: { title: "Error adding user", description: error.message },
      };
    }

    revalidatePath("/pages/service/users");
    return { isError: false, message: { title: "User updated successfully." } };
  } else {
    return { isError: true, message: { title: "User ID unknown." } };
  }
}

export async function searchUsers(term?: string) {
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

  // function createQuery(field: string, value: string) {
  //   return firestoreQuery(
  //     usersRef,
  //     where(field, "==", value),
  //     orderBy("createdAt", "desc"),
  //     limit(ITEMS_PER_PAGE)
  //   );
  // }

  if (term) {
    //   noStore();
    //   const firstNameQuery = createQuery("firstName", term);
    //   const lastNameQuery = createQuery("lastName", term);
    //   const emailQuery = createQuery("email", term);
    //   const [firstNameSnapshot, lastNameSnapshot, emailSnapshot] =
    //     await Promise.all([
    //       getUsersQuery(firstNameQuery),
    //       getUsersQuery(lastNameQuery),
    //       getUsersQuery(emailQuery),
    //     ]);
    //   const users = [
    //     ...firstNameSnapshot.users,
    //     ...lastNameSnapshot.users,
    //     ...emailSnapshot.users,
    //   ];
    //   const uniqueUsers = Array.from(new Set(users.map((user) => user.id))).map(
    //     (id) => users.find((user) => user.id === id)
    //   ) as FullUser[];
    //   return uniqueUsers;
  }

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: ITEMS_PER_PAGE,
  });

  const usersFrontend: FullUser[] = users.map((user) => {
    return { id: user.id, ...toUserPage(user) };
  });

  return usersFrontend;
}
