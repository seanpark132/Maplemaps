import { useSearchParams } from "react-router-dom";
import Loading from "./Loading.tsx";
import LinkArea from "../components/WorldMaps/LinkArea.tsx";
import MapDot from "../components/WorldMaps/MapDot.tsx";
import RegionSelect from "./RegionSelect.tsx";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GOOGLE_CLOUD_IMAGE_URL,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
} from "../utils/globalConstants.ts";
import {
  Link,
  Map,
  WorldMapData,
  MapData,
  MobData,
} from "../types/dataTypes.ts";
import { useFetchRegionData } from "../hooks/useFetchRegionData.tsx";
type Props = {
  worldMapsData: Record<string, WorldMapData>;
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
  visitedRegions: string[];
  setWorldMapsData: React.Dispatch<
    React.SetStateAction<Record<string, WorldMapData>>
  >;
  setVisitedRegions: React.Dispatch<React.SetStateAction<string[]>>;
  setMapsData: React.Dispatch<React.SetStateAction<Record<number, MapData>>>;
  setMobsData: React.Dispatch<React.SetStateAction<Record<number, MobData>>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WorldMaps(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams({
    worldMap: "",
    parentWorld: "",
  });
  const worldMap = searchParams.get("worldMap");
  const parentWorld = searchParams.get("parentWorld");
  const imageName = `${parentWorld ? parentWorld : "None"}_${worldMap}.webp`;

  useFetchRegionData(
    worldMap,
    props.visitedRegions,
    props.setWorldMapsData,
    props.setMapsData,
    props.setMobsData,
    props.setVisitedRegions,
    props.setIsError,
  );

  if (
    !worldMap ||
    (!ARCANE_RIVER_WORLD_MAPS.includes(worldMap) &&
      !GRANDIS_WORLD_MAPS.includes(worldMap) &&
      !MAPLE_WORLD_MAPS.includes(worldMap))
  ) {
    return <RegionSelect />;
  }

  const worldMapData = props.worldMapsData[worldMap];
  const parentWorldData = parentWorld ? props.worldMapsData[parentWorld] : null;
  const parentParentWorld = parentWorldData?.parentWorld;

  return worldMapData ? (
    <main className="flex min-w-[40rem] flex-col items-center px-0 pt-12 md:px-6">
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
            worldMapsData={props.worldMapsData}
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
            mobsData={props.mobsData}
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
