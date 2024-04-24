import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
// import AuthProvider from "../context/AuthProvider";
// import { AuthProvider } from "@/components/AuthProvider";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-slate-50 flex flex-col h-screen">
      {/* <AuthProvider> */}
      <header>
        <Header />
      </header>
      <main className="flex grow">{children}</main>
      <Toaster />
      <footer>
        <Footer />
      </footer>
      {/* </AuthProvider> */}
    </body>
  );
}
