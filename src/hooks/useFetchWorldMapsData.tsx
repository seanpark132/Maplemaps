import { useEffect } from "react";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
} from "../utils/GlobalConstants";
import { WorldMapData } from "../types/dataTypes";
import { fetchMongoDbConstructor } from "../utils/FetchMongoDbConstructor";

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
          const data = await fetchMongoDbConstructor({
            reqType: "worldMapsData",
            dataQuery: worldMapNames,
            dataQueryKey: "worldMapNames",
          });

          setWorldMapsData((prev) => ({ ...prev, ...data }));
        } catch (error) {
          console.error(error);
        }
      };

      fetchWorldMapsData();
    }
  }, [worldMap]);
};
