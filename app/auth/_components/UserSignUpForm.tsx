"use client";

import { useRouter } from "next/navigation";
import { signup } from "../util/actions";
import Input from "@/components/Input";
import { Button } from "./Button";
import { Label } from "./Label";
import { Icons } from "./Icons";
import { useState } from "react";
import { toast } from "sonner";

// function prettyDate(date: Date) {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   }).format(date);
// }

export function UserSignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function formAction(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
      confirmPassword,
    };
    const response = await signup(data);
    setIsLoading(false);

    if (response?.isError) {
      toast.error(response.message, {
        action: {
          label: "Copy",
          onClick: () => navigator.clipboard.writeText(response.message),
        },
      });
    } else {
      router.push("/pages");
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoCapitalize="none"
              autoCorrect="off"
              // minLength={6}
              disabled={isLoading}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              autoCapitalize="none"
              autoCorrect="off"
              // minLength={6}
              disabled={isLoading}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            parentClasses={
              "bg-login-primary mt-1 text-login-primary-foreground shadow hover:bg-login-primary/90"
            }
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
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
