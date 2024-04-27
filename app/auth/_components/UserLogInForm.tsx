"use client";

// import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { login } from "../util/actions";
import Input from "@/components/Input";
import { useState } from "react";
import { Button } from "./Button";
import { Label } from "./Label";
import { Icons } from "./Icons";
import { toast } from "sonner";

export function UserLogInForm() {
  const router = useRouter();
  // const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loginGoogle = () => {
  //   auth
  //     ?.loginGoogle()
  //     .then(() => console.log("Logged in!"))
  //     .catch(() => console.error("Something went wrong"));
  // };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const response = await login(email, password);
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
      <form onSubmit={onSubmit}>
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
              disabled={isLoading}
              minLength={6}
              required
            />
          </div>
          <Button
            disabled={isLoading}
            parentClasses={
              "mt-1 bg-login-primary text-login-primary-foreground shadow hover:bg-login-primary/90"
            }
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In with Email
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
      <Button
        type="button"
        disabled={isLoading}
        // onClick={loginGoogle}
        parentClasses={
          "border hover:bg-login-secondary text-login-secondary-foreground shadow-sm"
        }
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
