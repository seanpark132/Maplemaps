import { Link } from "react-router-dom";
import Search from "./Search/Search";
import { MapIdsNames } from "../types/dataTypes";
import { useEffect, useState } from "react";
import NavbarUnder768 from "./NavbarUnder768";

type Props = {
  mapIdsNames: MapIdsNames[];
};

export default function Navbar(props: Props) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {viewportWidth < 768 ? (
        <NavbarUnder768
          mapIdsNames={props.mapIdsNames}
          viewportWidth={viewportWidth}
        />
      ) : (
        <nav className="relative flex items-center px-4 py-3">
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
          <Search mapIdsNames={props.mapIdsNames} />
        </nav>
      )}
    </>
  );
}
