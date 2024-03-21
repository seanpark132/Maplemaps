import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center border-b px-4 py-2">
      <Link to="/" className="mr-8 text-base font-semibold xl:text-xl">
        Home
      </Link>
      <Link to="/about" className="mr-8 text-base font-semibold xl:text-xl">
        About
      </Link>
      <Link
        to="/rates-config"
        className="mr-8  text-base font-semibold xl:text-xl"
      >
        Rates Config
      </Link>
    </nav>
  );
}
