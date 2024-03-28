"use client";

// import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { createAuthUser } from "../util/actions";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Input from "@/components/Input";
// import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./Button";
import { Label } from "./Label";
import { Icons } from "./Icons";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  console.log("[SubmitButton] pending: ", pending);
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

export function UserSignUpForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(createAuthUser, initialState);
  const { pending } = useFormStatus();
  console.log("[UserSignUpForm] pending: ", pending);

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState("");

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
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              // disabled={isLoading}
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
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
              autoCapitalize="none"
              autoCorrect="off"
              // disabled={isLoading}
              minLength={6}
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
              // onChange={(e) => setPassword(e.target.value)}
              // value={confirmPassword}
              autoCapitalize="none"
              autoCorrect="off"
              // disabled={isLoading}
              minLength={6}
              required
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
      <Button
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
      </Button>
    </div>
  );
}
