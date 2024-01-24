import { useSearchParams } from "react-router-dom";

type Props = {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function RegionSelect(props: Props) {
  return (
    <main className="mt-8">
      <h1 className="mb-4">Select a Region:</h1>
      <div className="grid grid-cols-2 gap-16">
        <button onClick={() => handleClick("arcane_river")}>
          <img className="" src="/regions/arcane_river.jpg" />
        </button>
        <button onClick={() => handleClick("grandis")}>
          <img src="/regions/grandis.jpg" />
        </button>
      </div>
    </main>
  );

  function handleClick(region: string) {
    props.setSearchParams((prev) => {
      prev.set("region", region);
      return prev;
    });
  }
}
