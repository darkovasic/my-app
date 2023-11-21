import HomeSidebar from "@/components/HomeSidebar";

export default function Home() {
  console.log("[Home] rendering:");
  return (
    <div className="flex flex-1">
      <HomeSidebar />
      <section className="flex flex-1 items-center justify-center">
        The main content of your page goes here
      </section>
    </div>
  );
}
