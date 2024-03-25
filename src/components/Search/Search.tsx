import { useEffect, useState, useCallback } from "react";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { MapIdsNames } from "../../types/dataTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  mapIdsNames: MapIdsNames[];
  setIsSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Search(props: Props) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MapIdsNames[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [showResults, setShowResults] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchResults.length > 0 && !showResults) {
      setShowResults(true);
    }
    if (searchResults.length <= 0) {
      setShowResults(false);
    }
  }, [searchResults]);

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onBlur={resetSearchComplete}
    >
      <SearchBar
        searchInput={searchInput}
        searchResults={searchResults}
        handleInputChange={handleInputChange}
        setShowResults={setShowResults}
        setIsSearchOpen={props.setIsSearchOpen}
      />
      {showResults && (
        <SearchResults
          searchResults={searchResults}
          focusedIndex={focusedIndex}
          handleSelection={handleSelection}
          setSearchInput={setSearchInput}
          setSearchResults={setSearchResults}
        />
      )}
    </div>
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    const { key } = e;
    let nextIndexCount = 0;

    if (key === "ArrowDown") {
      nextIndexCount = (focusedIndex + 1) % searchResults.length;
    } else if (key === "ArrowUp") {
      nextIndexCount =
        (focusedIndex + searchResults.length - 1) % searchResults.length;
    } else if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
      return;
    } else if (key === "Escape") {
      resetSearchComplete();
    } else {
      return;
    }

    setFocusedIndex(nextIndexCount);
  }

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

  function handleSelection(selectedIndex: number) {
    const selectedResult = searchResults[selectedIndex];
    if (!selectedResult) return resetSearchComplete();
    navigate(`/map/${selectedResult.map_id}`);
    resetSearchComplete();
  }
}
