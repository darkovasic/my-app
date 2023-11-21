import type { Metadata } from "next";
import { Catamaran, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const catamaran = Catamaran({
  subsets: ["latin"],
  variable: "--font-catamaran",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

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
    <html lang="en" className={`${catamaran.variable}`}>
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
