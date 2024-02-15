import { useEffect } from "react";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
} from "../utils/GlobalVariables";
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
      const worldMapNumbers = ARCANE_RIVER_WORLD_MAPS.includes(worldMap)
        ? ARCANE_RIVER_WORLD_MAPS
        : GRANDIS_WORLD_MAPS.includes(worldMap)
          ? GRANDIS_WORLD_MAPS
          : MAPLE_WORLD_MAPS;

      const fetchWorldMapsData = async () => {
        try {
          const req = new Request("/.netlify/functions/getWorldMapsData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ worldMapNumbers: worldMapNumbers }),
          });

          const response = await fetch(req);
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
