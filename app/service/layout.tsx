import { ReactNode } from "react";
import ServiceSidebar from "./_components/ServiceSidebar";

function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      <ServiceSidebar />
      <section className="flex flex-1 items-center justify-center">
        {children}
      </section>
    </div>
  );
}

export default ServiceLayout;
