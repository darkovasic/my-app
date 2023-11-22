import type { Metadata } from "next";
import { catamaran, robotoMono } from "@/app/fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "My App",
    template: "%s | My App",
  },
  description: "My sandbox project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${catamaran.variable} ${robotoMono.variable}`}>
      <body className="bg-slate-50 flex flex-col h-screen">
        <header>
          <Header />
        </header>
        <main className="flex grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
