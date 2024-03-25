import { Link } from "react-router-dom";
import { MapIdsNames } from "../../types/dataTypes";
import { useRef } from "react";

type Props = {
  searchResults: MapIdsNames[];
  focusedIndex: number;
  handleSelection: (selectedIndex: number) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<MapIdsNames[]>>;
};

export default function SearchResults(props: Props) {
  const resultContainer = useRef<HTMLAnchorElement>(null);

  return (
    <div className="absolute flex w-72 flex-col rounded-b-lg bg-slate-200 py-4 opacity-100 sm:w-80 lg:w-96 dark:bg-slate-700">
      {props.searchResults.map((result, index) => (
        <Link
          key={result.map_id}
          onMouseDown={() => props.handleSelection(index)}
          to={`/map/${result.map_id}`}
          className="px-4 py-0.5"
          style={{
            backgroundColor:
              index === props.focusedIndex ? "rgba(0,0,0,0.3)" : "",
          }}
          ref={index === props.focusedIndex ? resultContainer : null}
        >
          {result.name}
        </Link>
      ))}
    </div>
  );
}
