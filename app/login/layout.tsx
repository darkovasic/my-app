import { catamaran, robotoMono } from "@/app/fonts";
import "../globals.css";

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${catamaran.variable} ${robotoMono.variable}`}>
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-[1400px] w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default LoginLayout;
