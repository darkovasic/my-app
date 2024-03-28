import { Metadata } from "next";
import Link from "next/link";
import { UserLogInForm } from "../_components/UserLogInForm";

export const metadata: Metadata = {
  title: "Log In",
};

export default function LogInPage() {
  return (
    <div className="lg:p-8">
      <Link
        href="/auth/signup"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        Sign Up
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log into your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your account details below
          </p>
        </div>
        <UserLogInForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="#" className="underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
