import { Link } from "react-router-dom";

export default function NavBar() {
  const links = [
    { to: "/builder", label: "Builder" },
    { to: "/runs", label: "Runs" },
    { to: "/replay", label: "Replay" },
    { to: "/about", label: "About" },
  ];
  return (
    <nav className="bg-indigo-600 text-white p-3 flex gap-4">
      {links.map((link) => (
        <Link key={link.to} to={link.to} className="hover:underline font-medium">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
