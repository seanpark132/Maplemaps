import { MapIdsNames } from "../../types/dataTypes";

type Props = {
  searchInput: string;
  searchResults: MapIdsNames[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar(props: Props) {
  return (
    <div className="flex">
      <input
        type="text"
        className="w-72 rounded-lg rounded-r-none border px-2.5 py-1 sm:w-80 lg:w-96"
        placeholder="Search by map name"
        onChange={(e) => props.handleInputChange(e)}
        value={props.searchInput}
        onClick={() => {
          if (props.searchResults.length > 0) props.setShowResults(true);
        }}
      />
      <button
        className="hidden items-center rounded-r-lg border border-l-0 px-2 py-1 md:flex"
        aria-label="search button"
      >
        <svg className="icon">
          <use xlinkHref="#icon-search"></use>
        </svg>
      </button>
      <button
        onClick={() => {
          if (props.setIsSearchOpen) props.setIsSearchOpen((prev) => !prev);
        }}
        className="flex items-center rounded-r-lg border border-l-0 bg-red-500 px-2 py-1 md:hidden"
      >
        <svg className="icon">
          <use xlinkHref="#icon-cross"></use>
        </svg>
      </button>
    </div>
  );
}
