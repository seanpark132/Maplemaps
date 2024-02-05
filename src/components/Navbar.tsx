import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center border-b px-4 py-2">
      <Link to="/" className="text-xl font-semibold">
        Home
      </Link>
    </nav>
  );
}
