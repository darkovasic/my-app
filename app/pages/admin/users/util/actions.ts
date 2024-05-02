"use server";

import { type User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/admin";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import type { User, FullUser, ActionError, UserTypes } from "./context";

const ITEMS_PER_PAGE = 10;

const setClaim = async (uid: string, claim: string, value: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("set_claim", {
    uid,
    claim,
    value,
  });
  return { data, error };
};

function toUserPage(data: SupabaseUser) {
  return {
    id: data.id,
    firstName: data.user_metadata.first_name,
    lastName: data.user_metadata.last_name,
    email: data.email,
    role: data.app_metadata.user_role,
    // description: data.description,
    createdAt: new Date(data.created_at).toLocaleString(),
    updatedAt: data.updated_at
      ? new Date(data.updated_at).toLocaleString()
      : "Never",
  };
}

export async function createUser(
  form_data: UserTypes
): Promise<ActionError | undefined> {
  try {
    if (!form_data.password) {
      throw new Error("Please enter password for this user.");
    }

    if (form_data.password.length < 6) {
      throw new Error("Password must have at leaset 6 characters.");
    }

    if (form_data.password !== form_data.confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const supabase = createClient();

    const { data: response, error } = await supabase.auth.admin.createUser({
      email: form_data.email,
      password: form_data.password,
      email_confirm: true,
      user_metadata: {
        first_name: form_data.firstName,
        last_name: form_data.lastName,
        full_name: `${form_data.firstName} ${form_data.lastName}`,
      },
    });
    console.log("[createUser response: ],", response);
    console.log("[createUser form_data: ],", form_data);
    if (error) {
      return {
        isError: true,
        status: error.status,
        message: { title: "Error adding user", description: error.message },
      };
    } else {
      const { error } = await setClaim(
        response.user.id,
        "user_role",
        form_data.role
      );
      if (error) {
        return {
          isError: true,
          message: { title: "Error adding role", description: error.message },
        };
      }
    }

    revalidatePath("/pages/service/users");
    return { isError: false, message: { title: "User added successfully." } };
  } catch (error) {
    return { isError: true, message: { title: `${error}` } };
  }
}

export async function deleteUser(id: string) {
  const supabase = createClient();

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

export async function updateUser(data: UserTypes): Promise<ActionError> {
  if (data.id) {
    const supabase = createClient();

    const { data: response, error } = await supabase.auth.admin.updateUserById(
      data.id,
      {
        email: data.email,
        password: data.password || undefined,
        email_confirm: true,
        user_metadata: {
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
        },
      }
    );

    if (error) {
      return {
        isError: true,
        status: error.status,
        message: { title: "Error adding user", description: error.message },
      };
    } else {
      const { error } = await setClaim(
        response.user.id,
        "user_role",
        data.role
      );
      if (error) {
        console.error("action set_claim", error.message);
      }
    }

    revalidatePath("/pages/service/users");
    return { isError: false, message: { title: "User updated successfully." } };
  } else {
    return { isError: true, message: { title: "User ID unknown." } };
  }
}

export async function searchUsers(term?: string) {
  const supabase = createClient();

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
    return { ...toUserPage(user) };
  });

  return usersFrontend;
}
