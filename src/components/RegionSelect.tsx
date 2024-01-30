import { useSearchParams } from "react-router-dom";
import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";

type Props = {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function RegionSelect(props: Props) {
  return (
    <main className="mt-8">
      <h1 className="mb-4">Select a Region:</h1>
      <div className="grid grid-cols-2 gap-16">
        <button onClick={() => handleClick("WorldMap082", "")}>
          <img
            className=""
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_WorldMap082.webp`}
            width={640}
            height={470}
            alt="Arcane River Region"
          />
        </button>
        <button onClick={() => handleClick("GWorldMap", "")}>
          <img
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_GWorldMap.webp`}
            width={640}
            height={470}
            alt="Grandis Region"
          />
        </button>
        <button onClick={() => handleClick("WorldMap", "")}>
          <img
            className=""
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_WorldMap.webp`}
            width={640}
            height={470}
            alt="Maple World Region"
          />
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
