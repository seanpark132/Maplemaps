import { useSearchParams } from "react-router-dom";
import {
  ARCANE_RIVER_WORLD_MAP_NAME,
  GOOGLE_CLOUD_IMAGE_URL,
  GRANDIS_WORLD_MAP_NAME,
  MAPLE_WORLD_MAP_NAME,
} from "../utils/GlobalConstants";

type Props = {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function RegionSelect(props: Props) {
  return (
    <main className="w-full">
      <h1 className="text-center">Select a Region:</h1>
      <div className="flex flex-wrap justify-center">
        <button onClick={() => handleClick(ARCANE_RIVER_WORLD_MAP_NAME, "")}>
          <img
            className="p-2"
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_WorldMap082.webp`}
            width={640}
            height={470}
            alt="Arcane River Region"
          />
        </button>
        <button onClick={() => handleClick(GRANDIS_WORLD_MAP_NAME, "")}>
          <img
            className="p-2"
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_GWorldMap.webp`}
            width={640}
            height={470}
            alt="Grandis Region"
          />
        </button>
        <button onClick={() => handleClick(MAPLE_WORLD_MAP_NAME, "")}>
          <img
            className="p-2"
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
