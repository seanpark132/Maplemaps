import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center border-b px-4 py-2">
      <Link to="/" className="mr-8 text-xl font-semibold">
        Home
      </Link>
      <Link to="/about" className="text-xl font-semibold">
        About
      </Link>
    </nav>
  );
}
