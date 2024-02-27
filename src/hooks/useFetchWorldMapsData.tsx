import { useEffect } from "react";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
} from "../utils/GlobalConstants";
import { WorldMapData } from "../types/worldMapTypes";

export const useFetchWorldMapsData = (
  worldMap: string | null,
  worldMapsData: Record<string, WorldMapData>,
  setWorldMapsData: React.Dispatch<
    React.SetStateAction<Record<string, WorldMapData>>
  >,
) => {
  useEffect(() => {
    if (!worldMap) return;

    if (!worldMapsData[worldMap]) {
      const worldMapNames = ARCANE_RIVER_WORLD_MAPS.includes(worldMap)
        ? ARCANE_RIVER_WORLD_MAPS
        : GRANDIS_WORLD_MAPS.includes(worldMap)
          ? GRANDIS_WORLD_MAPS
          : MAPLE_WORLD_MAPS;

      const fetchWorldMapsData = async () => {
        try {
          const response = await fetch(
            "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/nonprod/fetch-mongodb",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                reqType: "worldMapsData",
                worldMapNames: worldMapNames,
              }),
            },
          );
          const data = await response.json();
          setWorldMapsData((prev) => ({ ...prev, ...data }));
        } catch (error) {
          console.error(error);
        }
      };

      fetchWorldMapsData();
    }
  }, [worldMap]);
};
