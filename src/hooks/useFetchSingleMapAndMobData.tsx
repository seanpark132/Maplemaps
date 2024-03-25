import { useEffect } from "react";
import { MapData, MobData } from "../types/dataTypes";
import { fetchMongoDbConstructor } from "../utils/fetchMongoDbConstructor";

export const useFetchSingleMapMobData = (
  map_id: number,
  mapsData: Record<number, MapData>,
  mobsData: Record<number, MobData>,
  setMapData: React.Dispatch<React.SetStateAction<MapData | undefined>>,
  setMobData: React.Dispatch<React.SetStateAction<MobData[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    if (mapsData[map_id]) {
      const alreadyFetchedMapData = mapsData[map_id];
      const mobIds = alreadyFetchedMapData.mobIds;
      const alreadyFetchedMobsData = mobIds.map((id) => mobsData[id]);

      setMapData(alreadyFetchedMapData);
      setMobData(alreadyFetchedMobsData);
    } else {
      const fetchData = async () => {
        try {
          const singleMapMobData: { mapData: MapData; mobsData: MobData[] } =
            await fetchMongoDbConstructor({
              reqType: "singleMapMobData",
              mapId: map_id,
            });

          setMapData(singleMapMobData.mapData);
          setMobData(singleMapMobData.mobsData);
        } catch (error) {
          console.error(error);
          setIsError(true);
        }
      };
      fetchData();
    }
  }, []);
};
