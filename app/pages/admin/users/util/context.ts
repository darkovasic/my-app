// UserContext.ts

import { createContext, useContext } from "react";
import type { FormEventHandler } from "react";

export type ActionError = {
  isError: boolean;
  status?: number;
  message: {
    title: string;
    description?: string;
  };
};

export type ActionFunction = (
  data: UserTypes
) => Promise<undefined | ActionError>;

export type SubmissionState = {
  loading: boolean;
  error: ActionError | null;
};

export type FormHookResult = [
  SubmissionState,
  FormEventHandler<HTMLFormElement>
];

export type User = {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserTypes = {
  id?: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  description?: string;
};

export type FullUser = User & {
  id: string;
};

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "user", label: "User" },
];

type UserContextType = {
  user: FullUser;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContext;
