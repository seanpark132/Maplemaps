import { useSearchParams } from "react-router-dom";

type Props = {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function RegionSelect(props: Props) {
  return (
    <main className="mt-8">
      <h1 className="mb-4">Select a Region:</h1>
      <div className="grid grid-cols-2 gap-16">
        <button onClick={() => handleClick("WorldMap082", "")}>
          <img className="" src="/world_maps/None_WorldMap082.jpg" />
        </button>
        <button onClick={() => handleClick("GWorldMap", "")}>
          <img src="/world_maps/None_GWorldMap.jpg" />
        </button>
        <button onClick={() => handleClick("WorldMap", "")}>
          <img className="" src="/world_maps/None_WorldMap.jpg" />
        </button>
      </div>
    </main>
  );

  function handleClick(worldMap: string, parentWorld: string) {
    props.setSearchParams((prev) => {
      prev.set("worldMap", worldMap);
      prev.set("parentWorld", parentWorld);
      return prev;
    });
  }
}
