import { useEffect } from "react";
import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import { WorldMapData } from "../types/worldMapTypes";
import {
  ARCANE_RIVER_WORLD_MAPS,
  ARCANE_RIVER_WORLD_MAP_NAME,
  GRANDIS_WORLD_MAPS,
  GRANDIS_WORLD_MAP_NAME,
  MAPLE_WORLD_MAPS,
  MAPLE_WORLD_MAP_NAME,
} from "../utils/GlobalVariables";

export const useFetchMapsAndMobsData = (
  worldMap: string | null,
  worldMapsData: Record<string, WorldMapData>,
  visitedWorldMaps: Set<string>,
  setMapsData: React.Dispatch<React.SetStateAction<Record<number, MapData>>>,
  setMobsData: React.Dispatch<React.SetStateAction<Record<number, MobData>>>,
  setVisitedWorldMaps: React.Dispatch<React.SetStateAction<Set<string>>>,
) => {
  useEffect(() => {
    if (!worldMap) return;
    if (visitedWorldMaps.has(worldMap)) return;

    const regionWorldMap = ARCANE_RIVER_WORLD_MAPS.includes(worldMap)
      ? ARCANE_RIVER_WORLD_MAP_NAME
      : GRANDIS_WORLD_MAPS.includes(worldMap)
        ? GRANDIS_WORLD_MAP_NAME
        : MAPLE_WORLD_MAP_NAME;

    const regionWorldMapData = worldMapsData[regionWorldMap];
    const mapIdsFromWorldMap = regionWorldMapData.maps.flatMap(
      (map) => map.mapNumbers,
    );

    const fetchMapsAndMobsData = async () => {
      try {
        const mapsReq = new Request("/.netlify/functions/getMongoDbData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reqType: "mapsData",
            mapIds: mapIdsFromWorldMap,
          }),
        });

        const mapsResponse = await fetch(mapsReq);
        const mapsData: Record<number, MapData> = await mapsResponse.json();
        const mapsDataArray = Object.values(mapsData);
        const mobIds = mapsDataArray.reduce((acc: number[], item: MapData) => {
          return [...acc, ...item.mobIds];
        }, []);

        const mobsReq = new Request("/.netlify/functions/getMongoDbData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reqType: "mobsData", mobIds: mobIds }),
        });

        const mobsResponse = await fetch(mobsReq);
        const mobsData: Record<number, MobData> = await mobsResponse.json();

        setMapsData((prev) => ({ ...prev, ...mapsData }));
        setMobsData((prev) => ({ ...prev, ...mobsData }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMapsAndMobsData();

    // Add all ids from the current region to visitedWorldMaps
    if (regionWorldMap === ARCANE_RIVER_WORLD_MAP_NAME) {
      setVisitedWorldMaps((prev) => {
        const newSet = new Set(prev);
        ARCANE_RIVER_WORLD_MAPS.forEach((id) => newSet.add(id));
        return newSet;
      });
    } else if (regionWorldMap === GRANDIS_WORLD_MAP_NAME) {
      setVisitedWorldMaps((prev) => {
        const newSet = new Set(prev);
        GRANDIS_WORLD_MAPS.forEach((id) => newSet.add(id));
        return newSet;
      });
    } else {
      setVisitedWorldMaps((prev) => {
        const newSet = new Set(prev);
        MAPLE_WORLD_MAPS.forEach((id) => newSet.add(id));
        return newSet;
      });
    }
  }, [worldMapsData]);
};
