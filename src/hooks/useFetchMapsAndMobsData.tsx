import { useEffect } from "react";
import { WorldMapData, MapData, MobData } from "../types/dataTypes";
import {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
} from "../utils/GlobalConstants";

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
    if (Object.keys(worldMapsData).length === 0) return;

    const regionWorldMaps = ARCANE_RIVER_WORLD_MAPS.includes(worldMap)
      ? ARCANE_RIVER_WORLD_MAPS
      : GRANDIS_WORLD_MAPS.includes(worldMap)
        ? GRANDIS_WORLD_MAPS
        : MAPLE_WORLD_MAPS;

    const regionWorldMapsData = regionWorldMaps.map(
      (name: string) => worldMapsData[name],
    );

    const regionMapIds = regionWorldMapsData.reduce(
      (acc: number[], item: WorldMapData) => {
        return acc.concat(item.maps.flatMap((map) => map.mapNumbers));
      },
      [],
    );

    const uniqueRegionMapIds = [...new Set(regionMapIds)];

    const fetchMapsAndMobsData = async () => {
      try {
        const mapsReq = new Request(
          "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reqType: "mapsData",
              mapIds: uniqueRegionMapIds,
            }),
          },
        );

        const mapsResponse = await fetch(mapsReq);
        const mapsData: Record<number, MapData> = await mapsResponse.json();
        const mapsDataArray = Object.values(mapsData);
        const mobIds = mapsDataArray.reduce((acc: number[], item: MapData) => {
          return [...acc, ...item.mobIds];
        }, []);

        const mobsReq = new Request(
          "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reqType: "mobsData", mobIds: mobIds }),
          },
        );

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
    if (worldMap in ARCANE_RIVER_WORLD_MAPS) {
      setVisitedWorldMaps((prev) => {
        const newSet = new Set(prev);
        ARCANE_RIVER_WORLD_MAPS.forEach((id) => newSet.add(id));
        return newSet;
      });
    } else if (worldMap in GRANDIS_WORLD_MAPS) {
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
