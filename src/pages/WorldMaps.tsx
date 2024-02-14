import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Loading from "./Loading.tsx";
import LinkArea from "../components/LinkArea";
import MapDot from "../components/MapDot.tsx";
import RegionSelect from "../components/RegionSelect";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/GlobalVariables.ts";
import { Link, Map, WorldMapData } from "../types/worldMapTypes.ts";
import { MapData } from "../types/mapTypes.ts";
import { MobData } from "../types/mobTypes.ts";
import Error from "./Error.tsx";
import { useFetchWorldMapsData } from "../hooks/useFetchWorldMapsData.tsx";

type Props = {
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
  setMapsData: React.Dispatch<React.SetStateAction<Record<number, MapData>>>;
  setMobsData: React.Dispatch<React.SetStateAction<Record<number, MobData>>>;
};

export default function WorldMaps(props: Props) {
  const [worldMapsData, setWorldMapsData] = useState<
    Record<string, WorldMapData>
  >({});
  const [visitedWorldMaps, setVisitedWorldMaps] = useState<Set<string>>(
    new Set(),
  );
  const [searchParams, setSearchParams] = useSearchParams({
    worldMap: "",
    parentWorld: "",
  });
  const worldMap = searchParams.get("worldMap");
  const parentWorld = searchParams.get("parentWorld");
  const imageName = `${parentWorld ? parentWorld : "None"}_${worldMap}.webp`;

  useFetchWorldMapsData(
    worldMap,
    worldMapsData,
    setWorldMapsData,
    setVisitedWorldMaps,
  );

  if (!worldMap) {
    return <RegionSelect setSearchParams={setSearchParams} />;
  }

  const worldMapData = worldMapsData[worldMap];
  const parentWorldData = parentWorld ? worldMapsData[parentWorld] : null;
  const parentParentWorld = parentWorldData?.parentWorld;

  return worldMapData ? (
    <main className="flex min-w-[40rem] flex-col items-center pt-8">
      <h1 className="mb-2">Select a map/area:</h1>
      <div
        className="relative"
        onContextMenu={(event) => handleRightClick(event)}
      >
        <img
          src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/${imageName}`}
          width={640}
          height={470}
          alt={`World map image: ${worldMap}`}
        />
        {worldMapData.links.map((link: Link) => (
          <LinkArea
            key={link.linksTo}
            link={link}
            worldMapsData={worldMapsData}
            currentWorldMap={worldMap}
            setSearchParams={setSearchParams}
          />
        ))}
        {worldMapData.maps.map((map: Map) => (
          <MapDot
            key={`${map.x}${map.y}${map.type}`}
            currentWorldMap={worldMap}
            map={map}
            mapsData={props.mapsData}
          />
        ))}
      </div>
    </main>
  ) : (
    <Loading />
  );

  function handleRightClick(event: any) {
    event.preventDefault();

    if (parentWorld) {
      setSearchParams((prev) => {
        prev.set("worldMap", parentWorld);
        if (parentParentWorld) {
          prev.set("parentWorld", parentParentWorld);
        } else {
          prev.set("parentWorld", "");
        }
        return prev;
      });
    }
  }
}
