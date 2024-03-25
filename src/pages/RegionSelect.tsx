import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/globalConstants";
import { Link } from "react-router-dom";

export default function RegionSelect() {
  return (
    <main className="w-full">
      <h1 className="text-center">Select a Region:</h1>
      <div className="flex flex-wrap justify-center">
        <Link to={`/world-map/?worldMap=WorldMap082&parentWorld=`}>
          <img
            className="p-2"
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_WorldMap082.webp`}
            width={640}
            height={470}
            alt="Arcane River Region"
          />
        </Link>
        <Link to={`/world-map/?worldMap=GWorldMap&parentWorld=`}>
          <img
            className="p-2"
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_GWorldMap.webp`}
            width={640}
            height={470}
            alt="Grandis Region"
          />
        </Link>
        <Link to={`/world-map/?worldMap=WorldMap&parentWorld=`}>
          <img
            className="p-2"
            src={`${GOOGLE_CLOUD_IMAGE_URL}/world_maps/None_WorldMap.webp`}
            width={640}
            height={470}
            alt="Maple World Region"
          />
        </Link>
      </div>
    </main>
  );
}
