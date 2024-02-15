import { useSearchParams } from "react-router-dom";
import Loading from "./Loading.tsx";
import LinkArea from "../components/LinkArea";
import MapDot from "../components/MapDot.tsx";
import RegionSelect from "../components/RegionSelect";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/GlobalVariables.ts";
import { Link, Map, WorldMapData } from "../types/worldMapTypes.ts";
import { MapData } from "../types/mapTypes.ts";
import { MobData } from "../types/mobTypes.ts";
import { useFetchWorldMapsData } from "../hooks/useFetchWorldMapsData.tsx";
import { useFetchMapsAndMobsData } from "../hooks/useFetchMapsAndMobsData.tsx";

type Props = {
  worldMapsData: Record<string, WorldMapData>;
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
  visitedWorldMaps: Set<string>;
  setWorldMapsData: React.Dispatch<
    React.SetStateAction<Record<string, WorldMapData>>
  >;
  setVisitedWorldMaps: React.Dispatch<React.SetStateAction<Set<string>>>;
  setMapsData: React.Dispatch<React.SetStateAction<Record<number, MapData>>>;
  setMobsData: React.Dispatch<React.SetStateAction<Record<number, MobData>>>;
};

export default function WorldMaps(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams({
    worldMap: "",
    parentWorld: "",
  });
  const worldMap = searchParams.get("worldMap");
  const parentWorld = searchParams.get("parentWorld");
  const imageName = `${parentWorld ? parentWorld : "None"}_${worldMap}.webp`;

  useFetchWorldMapsData(worldMap, props.worldMapsData, props.setWorldMapsData);
  useFetchMapsAndMobsData(
    worldMap,
    props.worldMapsData,
    props.visitedWorldMaps,
    props.setMapsData,
    props.setMobsData,
    props.setVisitedWorldMaps,
  );

  if (!worldMap) {
    return <RegionSelect setSearchParams={setSearchParams} />;
  }

  const worldMapData = props.worldMapsData[worldMap];
  const parentWorldData = parentWorld ? props.worldMapsData[parentWorld] : null;
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
