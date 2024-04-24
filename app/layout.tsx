import type { Metadata } from "next";
import { catamaran, robotoMono } from "@/app/fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import AuthProvider from "./context/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "My App",
    template: "%s | My App",
  },
  description: "Darko's sandbox project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${catamaran.variable} ${robotoMono.variable}`}>
      {/* <AuthProvider> */}
      {children}
      {/* </AuthProvider> */}
    </html>
  );
}
