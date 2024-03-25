import { Link } from "react-router-dom";
import Search from "./Search/Search";
import { MapIdsNames } from "../types/dataTypes";
import { useEffect, useState } from "react";

type Props = {
  mapIdsNames: MapIdsNames[];
  viewportWidth: number;
};

export default function NavbarUnder768(props: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [props.viewportWidth]);

  return (
    <nav className="relative flex min-h-[3.375rem] items-center px-4 py-3">
      {!isSearchOpen && (
        <>
          <Link
            to="/"
            className="mr-6 text-base font-semibold xl:mr-8 xl:text-xl"
          >
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
        </>
      )}

      {!isSearchOpen && (
        <button
          className="ml-auto mr-2 flex items-center px-2 py-1.5"
          onClick={() => setIsSearchOpen((prev) => !prev)}
        >
          <svg className="icon">
            <use xlinkHref="#icon-search"></use>
          </svg>
        </button>
      )}
      {isSearchOpen && (
        <Search
          mapIdsNames={props.mapIdsNames}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </nav>
  );
}
