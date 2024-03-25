import { useEffect } from "react";
import { fetchMongoDbConstructor } from "../utils/fetchMongoDbConstructor";
import { MapIdsNames } from "../types/dataTypes";

export const useFetchMapIdsNames = (
  setMapIdsNames: React.Dispatch<React.SetStateAction<MapIdsNames[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const fetchMapIdsNames = async () => {
      try {
        const mapIdsNames: MapIdsNames[] = await fetchMongoDbConstructor({
          reqType: "mapIdsNames",
        });
        setMapIdsNames(mapIdsNames);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };
    fetchMapIdsNames();
  }, []);
};
