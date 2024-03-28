// UserAuthContext.ts

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

// export type User = {
//   role?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   description?: string;
//   createdAt?: Timestamp | string;
//   updatedAt?: Timestamp | string;
// };

export type UserAuthFirebase = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
};

type UserAuthContextType = {
  user: UserAuthFirebase;
};

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export const useUserAuthContext = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserAuthContext;
