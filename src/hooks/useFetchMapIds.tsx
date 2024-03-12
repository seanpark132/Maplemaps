import { useEffect } from "react";
import { fetchMongoDbConstructor } from "../utils/FetchMongoDbConstructor";

export const useFetchMapIds = (
  setMapIds: React.Dispatch<React.SetStateAction<number[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const fetchMapIds = async () => {
      try {
        const mapIds = await fetchMongoDbConstructor({ reqType: "mapIds" });
        setMapIds(mapIds);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };
    fetchMapIds();
  }, []);
};
