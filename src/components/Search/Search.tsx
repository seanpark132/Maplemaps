import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { MapIdsNames } from "../../types/dataTypes";

type Props = {
  mapIdsNames: MapIdsNames[];
};

export default function Search(props: Props) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MapIdsNames[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (searchResults.length > 0 && !showResults) {
      setShowResults(true);
    }
    if (searchResults.length <= 0) {
      setShowResults(false);
    }
  }, [searchResults]);

  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <SearchBar
        searchInput={searchInput}
        handleInputChange={handleInputChange}
        setShowResults={setShowResults}
      />
      {showResults && (
        <SearchResults
          searchResults={searchResults}
          setSearchInput={setSearchInput}
          setSearchResults={setSearchResults}
        />
      )}
    </div>
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchInput(value);
    const filteredSearchResults = getSearchResults(value);
    setSearchResults(filteredSearchResults);
  }

  function getSearchResults(value: string) {
    if (value === "") {
      return [];
    }

    const lowerCaseInput = value.toLowerCase();
    let searchResults = [];
    let count = 0;

    for (let i = 0; i < props.mapIdsNames.length && count < 10; i++) {
      const mapIdNameObj = props.mapIdsNames[i];
      const lowerCaseMapName = mapIdNameObj.name.toLowerCase();
      if (lowerCaseMapName.includes(lowerCaseInput)) {
        searchResults.push(mapIdNameObj);
        count++;
      }
    }
    return searchResults;
  }
}
