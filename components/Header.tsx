import { BeakerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NavLink from "@/components/NavLink";

const links = [
  { slug: "service", title: "Service" },
  { slug: "blog", title: "Blog" },
  { slug: "tutorials", title: "Tutorials" },
];

function Header() {
  return (
    <nav
      className={`bg-gray-800 flex justify-between items-center h-18 px-8 py-4`}
    >
      <Link href="/" className="flex items-center">
        <BeakerIcon className="h-6 w-6 text-gray-100" />
        <p
          className={`text-gray-100 ml-4 font-semibold text-2xl mr-auto font-mono`}
        >
          MyApp
        </p>
      </Link>
      <ul className="flex gap-6 list-none text-gray-100 font-semibold">
        {links.map((link) => (
          <li key={link.slug} className={`hover:text-blue-300`}>
            <NavLink path={link.slug} label={link.title} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Header;
