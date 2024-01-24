import { useSearchParams } from "react-router-dom";
import HoverArea from "../components/HoverArea";
import {
  ARCANE_RIVER_AREA_DATA,
  GRANDIS_AREA_DATA,
  AREAS_WITH_PARENT_AREAS,
} from "../data";
import RegionSelect from "../components/RegionSelect";

export default function WorldMap() {
  const [searchParams, setSearchParams] = useSearchParams({
    region: "",
    area: "",
  });

  let region = searchParams.get("region");
  let area = searchParams.get("area");

  if (!region) {
    return <RegionSelect setSearchParams={setSearchParams} />;
  }

  return (
    <main className="mt-8">
      <h1 className="mb-2">{area ? "Select a map:" : "Select an area:"}</h1>
      <div
        className="relative"
        onContextMenu={(event) => handleRightClick(event)}
      >
        <img src={area ? `/areas/${area}.jpg` : `/regions/${region}.jpg`} />
        {region === "arcane_river" &&
          ARCANE_RIVER_AREA_DATA.map((data) => (
            <HoverArea
              key={data.name}
              area={area}
              region={region}
              setSearchParams={setSearchParams}
              left={data.left}
              top={data.top}
              dotLeft={data.dotLeft}
              dotTop={data.dotTop}
              name={data.name}
              parentArea={data.parentArea}
            />
          ))}
        {region === "grandis" &&
          GRANDIS_AREA_DATA.map((data) => (
            <HoverArea
              key={data.name}
              area={area}
              region={region}
              setSearchParams={setSearchParams}
              left={data.left}
              top={data.top}
              dotLeft={data.dotLeft}
              dotTop={data.dotTop}
              name={data.name}
              parentArea={data.parentArea}
            />
          ))}
      </div>
    </main>
  );

  function handleRightClick(event: any) {
    event.preventDefault();

    if (!region || !area) {
      return;
    } else if (area in AREAS_WITH_PARENT_AREAS) {
      setSearchParams((prev) => {
        prev.set(
          "area",
          AREAS_WITH_PARENT_AREAS[area as keyof typeof AREAS_WITH_PARENT_AREAS],
        );
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("area", "");
        return prev;
      });
    }
  }
}
