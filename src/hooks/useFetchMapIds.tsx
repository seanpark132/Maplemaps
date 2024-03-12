import { useEffect } from "react";
import { fetchMongoDbConstructor } from "../utils/FetchMongoDbConstructor";

export const useFetchMapIds = (
  setMapIds: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  useEffect(() => {
    const fetchMapIds = async () => {
      try {
        const mapIds = await fetchMongoDbConstructor({ reqType: "mapIds" });
        setMapIds(mapIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMapIds();
  }, []);
};
