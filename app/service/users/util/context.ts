// UserContext.ts
import { createContext, useContext } from "react";
import type { FieldValue, Timestamp } from "firebase/firestore";
import type { FormEventHandler } from "react";

export type ActionError = {
  isError: boolean;
  message: string;
};

export type ActionFunction = (
  formData: FormData
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
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
};

export type UserFirebase = {
  role?: FormDataEntryValue | null;
  firstName?: FormDataEntryValue | null;
  lastName?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  description?: FormDataEntryValue | null;
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
};

export type FullUser = User & {
  id: string;
};

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "guest", label: "Guest" },
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
