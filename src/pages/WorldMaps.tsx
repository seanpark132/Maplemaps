import { useSearchParams } from "react-router-dom";
import LinkArea from "../components/LinkArea";
import MapDot from "../components/MapDot.tsx";
import RegionSelect from "../components/RegionSelect";
import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables.tsx";
import { Link, Map, WorldMapData } from "../types/worldMapTypes.ts";

type Props = {
  worldMapsData: WorldMapData[];
  mapsData: any[];
};

export default function WorldMaps(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams({
    worldMap: "",
    parentWorld: "",
  });
  const worldMap = searchParams.get("worldMap");
  const parentWorld = searchParams.get("parentWorld");
  const imageName = `${parentWorld ? parentWorld : "None"}_${worldMap}.webp`;

  if (!worldMap) {
    return <RegionSelect setSearchParams={setSearchParams} />;
  }

  const worldMapData = props.worldMapsData.find(
    (data) => data.worldMapName === worldMap,
  );
  const parentWorldData = props.worldMapsData.find(
    (data) => data.worldMapName === parentWorld,
  );
  const parentParentWorld = parentWorldData?.parentWorld;

  return (
    <main className="pt-8">
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
        {worldMapData?.links.map((link: Link) => (
          <LinkArea
            key={link.linksTo}
            link={link}
            worldMapsData={props.worldMapsData}
            currentWorldMap={worldMap}
            setSearchParams={setSearchParams}
          />
        ))}
        {worldMapData?.maps.map((map: Map) => (
          <MapDot
            key={`${map.x}${map.y}${map.type}`}
            currentWorldMap={worldMap}
            map={map}
            mapsData={props.mapsData}
          />
        ))}
      </div>
    </main>
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
