import { useEffect } from "react";
import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import { WorldMapData } from "../types/worldMapTypes";

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
    const currentWorldMapData = worldMapsData[worldMap];
    if (!currentWorldMapData) return;

    const mapIdsFromWorldMap = currentWorldMapData.maps.flatMap(
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
    setVisitedWorldMaps((prev) => new Set(prev).add(worldMap));
  }, [worldMapsData]);
};
