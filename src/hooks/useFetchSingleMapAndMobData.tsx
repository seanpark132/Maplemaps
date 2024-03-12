import { useEffect } from "react";
import { MapData, MobData } from "../types/dataTypes";
import { fetchMongoDbConstructor } from "../utils/FetchMongoDbConstructor";

export const useFetchSingleMapAndMobData = (
  id: number,
  mapsData: Record<number, MapData>,
  mobsData: Record<number, MobData>,
  setMapData: React.Dispatch<React.SetStateAction<MapData | undefined>>,
  setMobData: React.Dispatch<React.SetStateAction<MobData[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
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
          const mapData: Record<number, MapData> =
            await fetchMongoDbConstructor({
              reqType: "mapsData",
              dataQuery: [id],
              dataQueryKey: "mapIds",
            });

          const mapDataValue = mapData[id];
          const mobIds = mapDataValue.mobIds;
          const mobData: Record<number, MobData> =
            await fetchMongoDbConstructor({
              reqType: "mobsData",
              dataQuery: mobIds,
              dataQueryKey: "mobIds",
            });

          const mobsDataArray = Object.values(mobData);
          setMapData(mapDataValue);
          setMobData(mobsDataArray);
        } catch (error) {
          console.error(error);
          setIsError(true);
        }
      };

      fetchData();
    }
  }, []);
};
