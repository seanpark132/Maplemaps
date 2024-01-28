import { useSearchParams } from "react-router-dom";
import LinkArea from "../components/LinkArea";
import MapDot from "../components/MapDot.tsx";
import { ALL_WORLD_MAPS_DATA } from "../data/AllWorldMaps.ts";
import RegionSelect from "../components/RegionSelect";

export default function WorldMaps() {
  const [searchParams, setSearchParams] = useSearchParams({
    worldMap: "",
    parentWorld: "",
    map: "",
  });

  const worldMap = searchParams.get("worldMap");
  const parentWorld = searchParams.get("parentWorld");
  const map = searchParams.get("map");

  const imageName = `${parentWorld ? parentWorld : "None"}_${worldMap}.jpg`;

  if (!worldMap) {
    return <RegionSelect setSearchParams={setSearchParams} />;
  }

  const worldMapData = ALL_WORLD_MAPS_DATA.find(
    (worldMapData) => worldMapData.raw.worldMapName === worldMap,
  );

  const linksArray = worldMapData?.raw.links;
  const mapsArray = worldMapData?.raw.maps;

  const parentWorldData = ALL_WORLD_MAPS_DATA.find(
    (worldMapData) => worldMapData.raw.worldMapName === parentWorld,
  );
  const parentParentWorld = parentWorldData?.raw.parentWorld;

  return (
    <main className="mt-8">
      <h1 className="mb-2">Select an area:</h1>
      <div
        className="relative"
        onContextMenu={(event) => handleRightClick(event)}
      >
        <img src={`/world_maps/${imageName}`} />
        {linksArray?.map((link) => (
          <LinkArea
            worldMap={link.linksTo}
            base64ImgCode={link.linkImage.image}
            x={link.linkImage.origin.value.x}
            y={link.linkImage.origin.value.y}
            setSearchParams={setSearchParams}
          />
        ))}
        {mapsArray?.map((map) => (
          <MapDot x={map.spot.value.x} y={map.spot.value.y} />
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
