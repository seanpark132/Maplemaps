import { useEffect } from "react";
import { WorldMapData, MapData, MobData } from "../types/dataTypes";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
} from "../utils/GlobalConstants";
import { fetchMongoDbConstructor } from "../utils/FetchMongoDbConstructor";

export const useFetchRegionData = (
  worldMap: string | null,
  visitedRegions: string[],
  setWorldMapsData: React.Dispatch<
    React.SetStateAction<Record<string, WorldMapData>>
  >,
  setMapsData: React.Dispatch<React.SetStateAction<Record<number, MapData>>>,
  setMobsData: React.Dispatch<React.SetStateAction<Record<number, MobData>>>,
  setVisitedRegions: React.Dispatch<React.SetStateAction<string[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    if (!worldMap) return;

    const region = ARCANE_RIVER_WORLD_MAPS.includes(worldMap)
      ? "arcane_river"
      : GRANDIS_WORLD_MAPS.includes(worldMap)
        ? "grandis"
        : "maple_world";

    if (visitedRegions.includes(region)) return;

    setVisitedRegions((prev) => [...prev, region]);

    const fetchRegionData = async () => {
      try {
        const regionData = await fetchMongoDbConstructor({
          reqType: "regionData",
          region: region,
        });

        const regionWorldMapsData: Record<string, WorldMapData> =
          regionData.worldMapsData;
        const regionMapsData: Record<number, MapData> = regionData.mapsData;
        const regionMobsData: Record<number, MobData> = regionData.mobsData;

        setWorldMapsData((prev) => ({ ...prev, ...regionWorldMapsData }));
        setMapsData((prev) => ({ ...prev, ...regionMapsData }));
        setMobsData((prev) => ({ ...prev, ...regionMobsData }));
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };

    fetchRegionData();
  }, [worldMap]);
};
