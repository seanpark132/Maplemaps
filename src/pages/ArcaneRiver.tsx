import { useSearchParams } from "react-router-dom";
import HoverArea from "../components/HoverArea";
import BigDot from "../components/BigDot";

export default function ArcaneRiver() {
  const [searchParams, setSearchParams] = useSearchParams({
    currentArea: "",
  });

  let currentArea = searchParams.get("currentArea");
  if (!currentArea) {
    currentArea = "arcane_river";
  }

  const areaData = [
    {
      left: 6,
      top: 5,
      name: "vanishing_journey",
      parentArea: "arcane_river",
    },
    {
      left: 170,
      top: 14,
      name: "reverse_city",
      parentArea: "arcane_river",
    },
    {
      left: 34,
      top: 254,

      name: "chu_chu_island",
      parentArea: "arcane_river",
    },
    {
      left: 25,
      top: 355,

      name: "yum_yum_island",
      parentArea: "arcane_river",
    },
    {
      left: 100,
      top: 122,

      name: "lachelein",
      parentArea: "arcane_river",
    },
    {
      left: 255,
      top: 71,

      name: "arcana",
      parentArea: "arcane_river",
    },
    {
      left: 238,
      top: 223,

      name: "morass",
      parentArea: "arcane_river",
    },
    {
      left: 388,
      top: 168,

      name: "esfera",
      parentArea: "arcane_river",
    },
    {
      left: 387,
      top: 280,

      name: "sellas",
      parentArea: "arcane_river",
    },
    {
      left: 406,
      top: 20,

      name: "tenebris",
      parentArea: "arcane_river",
    },
    { left: 0, top: 6, name: "moonbridge", parentArea: "tenebris" },
    {
      left: 210,
      top: 0,
      name: "labyrinth_of_suffering",
      parentArea: "tenebris",
    },
    { left: 333, top: 0, name: "limina", parentArea: "tenebris" },
  ];

  const bigDotData = [
    { left: 100, top: 93, area: "arcane_river" },
    { left: 226, top: 46, area: "arcane_river" },
    { left: 126, top: 306, area: "arcane_river" },
    { left: 64, top: 379, area: "arcane_river" },
    { left: 191, top: 199, area: "arcane_river" },
    { left: 336, top: 132, area: "arcane_river" },
    { left: 319, top: 320, area: "arcane_river" },
    { left: 492, top: 243, area: "arcane_river" },
    { left: 473, top: 323, area: "arcane_river" },
    { left: 493, top: 90, area: "arcane_river" },
    { left: 127, top: 179, area: "tenebris" },
    { left: 322, top: 205, area: "tenebris" },
    { left: 453, top: 120, area: "tenebris" },
  ];

  return (
    <main>
      <h1>Select a map:</h1>
      <div className="relative">
        <img
          src={
            currentArea
              ? `/arcane_river_maps/${currentArea}.jpg`
              : `/arcane_river_maps/arcane_river.jpg`
          }
        />
        {areaData.map((data) => (
          <HoverArea
            key={data.name}
            currentArea={currentArea}
            setSearchParams={setSearchParams}
            left={data.left}
            top={data.top}
            name={data.name}
            parentArea={data.parentArea}
          />
        ))}
        {bigDotData.map((data) => (
          <BigDot
            key={`${data.left}, ${data.top}`}
            currentArea={currentArea}
            left={data.left}
            top={data.top}
            area={data.area}
          />
        ))}
      </div>
    </main>
  );
}
