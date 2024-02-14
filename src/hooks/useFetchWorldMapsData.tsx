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
  setVisitedWorldMaps: React.Dispatch<React.SetStateAction<Set<string>>>,
) => {
  useEffect(() => {
    if (!worldMap) return;

    if (!worldMapsData[worldMap]) {
      const body = ARCANE_RIVER_WORLD_MAPS.includes(worldMap)
        ? ARCANE_RIVER_WORLD_MAPS
        : GRANDIS_WORLD_MAPS.includes(worldMap)
          ? GRANDIS_WORLD_MAPS
          : MAPLE_WORLD_MAPS;

      const worldMapsRequest = new Request(
        "/.netlify/functions/getWorldMapsData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ worldMapNumbers: body }),
        },
      );

      const fetchWorldMapsData = async (req: Request) => {
        try {
          const response = await fetch(req);
          const data = await response.json();
          setWorldMapsData((prev) => ({ ...prev, ...data }));
        } catch (error) {
          console.error(error);
        }
      };

      fetchWorldMapsData(worldMapsRequest);
      setVisitedWorldMaps((prev) => new Set(prev).add(worldMap));
    }
  }, [worldMap, setWorldMapsData, setVisitedWorldMaps]);
};
