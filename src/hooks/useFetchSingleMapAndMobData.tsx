import { useEffect } from "react";
import { MapData, MobData } from "../types/dataTypes";

export const useFetchSingleMapAndMobData = (
  id: number,
  mapsData: Record<number, MapData>,
  mobsData: Record<number, MobData>,
  setMapData: React.Dispatch<React.SetStateAction<MapData | undefined>>,
  setMobData: React.Dispatch<React.SetStateAction<MobData[]>>,
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
          const mapReq = new Request(
            "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ reqType: "mapsData", mapIds: [id] }),
            },
          );

          const mapResponse = await fetch(mapReq);
          const mapData: Record<number, MapData> = await mapResponse.json();
          const mapDataValue = mapData[id];
          const mobIds = mapDataValue.mobIds;

          const mobReq = new Request(
            "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ reqType: "mobsData", mobIds: mobIds }),
            },
          );
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
