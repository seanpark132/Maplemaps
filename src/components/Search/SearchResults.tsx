import { Link } from "react-router-dom";
import { MapIdsNames } from "../../types/dataTypes";

type Props = {
  searchResults: MapIdsNames[];
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<MapIdsNames[]>>;
};

export default function SearchResults(props: Props) {
  return (
    <div className="absolute flex w-80 flex-col rounded-b-lg bg-slate-200 p-4 opacity-100 dark:bg-slate-900">
      {props.searchResults.map((result) => (
        <Link
          key={result.map_id}
          to={`/map/${result.map_id}`}
          className="py-0.5"
          onClick={() => {
            props.setSearchInput("");
            props.setSearchResults([]);
          }}
        >
          {result.name}
        </Link>
      ))}
    </div>
  );
}
