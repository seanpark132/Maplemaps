type Props = {
  searchInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar(props: Props) {
  return (
    <div className="flex">
      <input
        type="text"
        className="w-80 rounded-lg rounded-r-none border px-2.5 py-1"
        placeholder="Search by map name"
        onChange={(e) => props.handleInputChange(e)}
        value={props.searchInput}
      />
      <button className="flex items-center rounded-r-lg border border-l-0 px-2">
        <svg className="icon">
          <use xlinkHref="#icon-search"></use>
        </svg>
      </button>
    </div>
  );
}
