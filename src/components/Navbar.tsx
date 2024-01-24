import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center px-4 py-2">
      <Link to="/">Home</Link>
    </nav>
  );
}
