"use client";

import { useRouter } from "next/navigation";
import { signup } from "../util/actions";
import Input from "@/components/Input";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./Button";
import { Label } from "./Label";
import { Icons } from "./Icons";
import { useRef, useState } from "react";
import { toast } from "sonner";

const initialState = {
  isError: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  // console.log("[SubmitButton] pending: ", pending);
  return (
    <Button
      type="submit"
      disabled={pending}
      parentClasses={
        "bg-login-primary mt-1 text-login-primary-foreground shadow hover:bg-login-primary/90"
      }
    >
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sign Up with Email
    </Button>
  );
}

// function prettyDate(date: Date) {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// }

export function UserSignUpForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(signup, initialState);
  // const { pending } = useFormStatus();

  if (state.isError === true) {
    toast.error(state.message);
  }

  console.log("[UserSignUpForm] state: ", state);

  return (
    <div className="grid gap-6">
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password here"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              // minLength={6}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirm_password">
              Confirm Password
            </Label>
            <Input
              id="confirm_password"
              placeholder="Confirm your password here"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              // minLength={6}
              // required
            />
          </div>
          <SubmitButton />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* <Button
        type="button"
        disabled={pending}
        parentClasses={
          "border hover:bg-login-secondary text-login-secondary-foreground shadow-sm"
        }
      >
        {pending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button> */}
    </div>
  );
}
