import { Link } from "react-router-dom";
import Search from "./Search/Search";
import { MapIdsNames } from "../types/dataTypes";

type Props = {
  mapIdsNames: MapIdsNames[];
};

export default function Navbar(props: Props) {
  return (
    <nav className="relative flex items-center px-4 py-3">
      <Link to="/" className="mr-6 text-base font-semibold xl:mr-8 xl:text-xl">
        Home
      </Link>
      <Link
        to="/about"
        className="mr-6 text-base font-semibold xl:mr-8 xl:text-xl"
      >
        About
      </Link>
      <Link
        to="/rates-config"
        className="mr-6 text-base font-semibold xl:mr-8 xl:text-xl"
      >
        Config
      </Link>
      <Search mapIdsNames={props.mapIdsNames} />
    </nav>
  );
}
