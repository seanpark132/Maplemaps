import { useEffect } from "react";
import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import { WorldMapData } from "../types/worldMapTypes";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
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
      ? "WorldMap082"
      : GRANDIS_WORLD_MAPS.includes(worldMap)
        ? "GWorldMap"
        : "WorldMap";

    const regionWorldMapData = worldMapsData[regionWorldMap];
    const mapIdsFromWorldMap = regionWorldMapData.maps.flatMap(
      (map) => map.mapNumbers,
    );

    const fetchMapsAndMobsData = async () => {
      try {
        const mapsReq = new Request("/.netlify/functions/getMapsData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mapIds: mapIdsFromWorldMap }),
        });

        const mapsResponse = await fetch(mapsReq);
        const mapsData: Record<number, MapData> = await mapsResponse.json();
        const mapsDataArray = Object.values(mapsData);
        const mobIds = mapsDataArray.reduce((acc: number[], item: MapData) => {
          return [...acc, ...item.mobIds];
        }, []);

        const mobsReq = new Request("/.netlify/functions/getMobsData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobIds: mobIds }),
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
    if (regionWorldMap === "WorldMap082") {
      setVisitedWorldMaps((prev) => {
        const newSet = new Set(prev);
        ARCANE_RIVER_WORLD_MAPS.forEach((id) => newSet.add(id));
        return newSet;
      });
    } else if (regionWorldMap === "GWorldMap") {
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
