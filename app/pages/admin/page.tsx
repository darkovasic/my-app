import { cookies } from "next/headers";
// import { ItemAccess, type Item } from "../../api/items/route_old";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const cookieStore = cookies();
  // const authToken = cookieStore.get("firebaseIdToken")?.value;

  // if (!authToken) {
  //   return redirect("/auth/login");
  // }

  // let items: Item[] = [];
  // const response = await fetch(`${process.env.API_URL}/api/items`, {
  //   headers: {
  //     Authorization: `Bearer ${authToken}`,
  //   },
  // });
  // if (response.ok) {
  //   const itemsJson = await response.json();
  //   if (itemsJson && itemsJson.length > 0) items = itemsJson;
  // }
  return (
    <section className="flex flex-col items-center w-full bg-cyan-800 pt-40">
      <h1 className="text-white text-xl mb-10">Admin Page</h1>
      {/* <div className="w-72">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between w-full gap-20 bg-slate-100/10 rounded text-slate-200 text-sm font-semibold px-2 py-1 mb-2"
            >
              <p>{item.title}</p>
              <span
                className={`${
                  item.access === ItemAccess.ADMIN
                    ? "bg-orange-400"
                    : item.access === ItemAccess.PRO
                    ? "bg-emerald-400"
                    : item.access === ItemAccess.USER
                    ? "bg-pink-400"
                    : "bg-slate-400"
                } text-white text-xs px-2 py-1 rounded-full`}
              >
                {item.access}
              </span>
            </div>
          );
        })}
      </div> */}
    </section>
  );
};

export default AdminPage;
