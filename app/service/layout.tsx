import ServiceSidebar from "./_components/ServiceSidebar";

function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      <ServiceSidebar /> {children}
    </div>
  );
}

export default ServiceLayout;
