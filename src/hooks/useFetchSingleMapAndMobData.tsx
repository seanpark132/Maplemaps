import { useEffect } from "react";
import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";

export const useFetchSingleMapAndMobData = (
  id: number,
  mapsData: Record<number, MapData>,
  mobsData: Record<number, MobData>,
  setMapData: React.Dispatch<React.SetStateAction<MapData | undefined>>,
  setMobData: React.Dispatch<React.SetStateAction<(MobData | undefined)[]>>,
) => {
  useEffect(() => {
    if (mapsData[id]) {
      const alreadyFetchedMapData = mapsData[id];
      const mobIds = alreadyFetchedMapData.mobIds;
      const alreadyFetchedMobsData = mobIds.map((id) => mobsData[id]);
      setMapData(alreadyFetchedMapData);
      setMobData(alreadyFetchedMobsData);
    } else {
      const fetchData = async () => {
        try {
          const mapReq = new Request("/.netlify/functions/getMapsData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mapIds: [id] }),
          });

          const mapResponse = await fetch(mapReq);
          const mapData: Record<number, MapData> = await mapResponse.json();
          const mapDataValue = mapData[id];
          const mobIds = mapDataValue.mobIds;

          const mobReq = new Request("/.netlify/functions/getMobsData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobIds: mobIds }),
          });
          const mobResponse = await fetch(mobReq);
          const mobData: Record<number, MobData> = await mobResponse.json();
          const mobsDataArray = Object.values(mobData);
          setMapData(mapDataValue);
          setMobData(mobsDataArray);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, []);
};