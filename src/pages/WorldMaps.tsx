import { useSearchParams } from "react-router-dom";
import LinkArea from "../components/LinkArea";
import MapDot from "../components/MapDot.tsx";
import RegionSelect from "../components/RegionSelect";
import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables.tsx";

type Props = {
  allWorldMapsData: any[];
};

export default function WorldMaps(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams({
    worldMap: "",
    parentWorld: "",
    map: "",
  });
  const worldMap = searchParams.get("worldMap");
  const parentWorld = searchParams.get("parentWorld");
  const imageName = `${parentWorld ? parentWorld : "None"}_${worldMap}.webp`;

  if (!worldMap) {
    return <RegionSelect setSearchParams={setSearchParams} />;
  }

  const worldMapData = props.allWorldMapsData.find(
    (worldMapData) => worldMapData.raw.worldMapName === worldMap,
  );
  const linksArray = worldMapData?.raw.links;
  const mapsArray = worldMapData?.raw.maps;
  const parentWorldData = props.allWorldMapsData.find(
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
        <img
          src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/${imageName}`}
          width={640}
          height={470}
          alt={`World map image: ${worldMap}`}
        />
        {linksArray?.map((link: any) => (
          <LinkArea
            key={link.linksTo}
            allWorldMapsData={props.allWorldMapsData}
            currentWorldMap={worldMap}
            worldMap={link.linksTo}
            base64ImgCode={link.linkImage.image}
            x={link.linkImage.origin.value.x}
            y={link.linkImage.origin.value.y}
            setSearchParams={setSearchParams}
          />
        ))}
        {mapsArray?.map((map: any) => (
          <MapDot
            key={`${map.spot.value.x}${map.spot.value.y}${map.type}`}
            currentWorldMap={worldMap}
            x={map.spot.value.x}
            y={map.spot.value.y}
            type={map.type}
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
