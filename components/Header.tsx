import { BeakerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const links = [
  { slug: "service", title: "Service" },
  { slug: "blog", title: "Blog" },
  { slug: "tutorials", title: "Tutorials" },
];

function Header() {
  return (
    <nav className="bg-gray-800 flex justify-between items-center h-18 px-8 py-4">
      <BeakerIcon className="h-6 w-6 text-gray-100" />
      <p className="text-gray-100 ml-4 font-semibold text-2xl mr-auto">MyApp</p>
      <ul className="flex gap-6 list-none text-gray-100 font-semibold">
        {links.map((link) => (
          <li key={link.slug}>
            <Link href={link.slug}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Header;
