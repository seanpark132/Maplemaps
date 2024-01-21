import { useSearchParams } from "react-router-dom";
import HoverArea from "../components/HoverArea";

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
      dotLeft: 94,
      dotTop: 88,
      name: "vanishing_journey",
      parentArea: "arcane_river",
    },
    {
      left: 170,
      top: 14,
      dotLeft: 56,
      dotTop: 33,
      name: "reverse_city",
      parentArea: "arcane_river",
    },
    {
      left: 34,
      top: 254,
      dotLeft: 91,
      dotTop: 52,

      name: "chu_chu_island",
      parentArea: "arcane_river",
    },
    {
      left: 25,
      top: 355,
      dotLeft: 39,
      dotTop: 24,

      name: "yum_yum_island",
      parentArea: "arcane_river",
    },
    {
      left: 100,
      top: 122,
      dotLeft: 91,
      dotTop: 76,

      name: "lachelein",
      parentArea: "arcane_river",
    },
    {
      left: 255,
      top: 71,
      dotLeft: 81,
      dotTop: 61,

      name: "arcana",
      parentArea: "arcane_river",
    },
    {
      left: 238,
      top: 223,
      dotLeft: 81,
      dotTop: 97,
      name: "morass",
      parentArea: "arcane_river",
    },
    {
      left: 388,
      top: 168,
      dotLeft: 104,
      dotTop: 75,
      name: "esfera",
      parentArea: "arcane_river",
    },
    {
      left: 387,
      top: 280,
      dotLeft: 86,
      dotTop: 43,
      name: "sellas",
      parentArea: "arcane_river",
    },
    {
      left: 406,
      top: 20,
      dotLeft: 87,
      dotTop: 70,
      name: "tenebris",
      parentArea: "arcane_river",
    },
    {
      left: 0,
      top: 6,
      dotLeft: 127,
      dotTop: 173,
      name: "moonbridge",
      parentArea: "tenebris",
    },
    {
      left: 210,
      top: 0,
      dotLeft: 112,
      dotTop: 205,
      name: "labyrinth_of_suffering",
      parentArea: "tenebris",
    },
    {
      left: 333,
      top: 0,
      dotLeft: 120,
      dotTop: 120,
      name: "limina",
      parentArea: "tenebris",
    },
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
            dotLeft={data.dotLeft}
            dotTop={data.dotTop}
            name={data.name}
            parentArea={data.parentArea}
          />
        ))}
      </div>
    </main>
  );
}
