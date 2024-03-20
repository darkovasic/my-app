import type { Metadata } from "next";
import { catamaran, robotoMono } from "@/app/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login Page",
};
import LeftImage from "./_components/LeftImage";

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${catamaran.variable} ${robotoMono.variable}`}>
      <body>
        <div className="flex flex-1">
          <LeftImage /> {children}
        </div>
      </body>
    </html>
  );
}

export default LoginLayout;
