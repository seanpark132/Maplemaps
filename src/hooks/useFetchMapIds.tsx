import { useEffect } from "react";

export const useFetchMapIds = (
  setMapIds: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  useEffect(() => {
    const fetchMapIds = async () => {
      try {
        const req = new Request("/.netlify/functions/getMongoDbData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reqType: "mapIds" }),
        });

        const response = await fetch(req);
        const mapIds: number[] = await response.json();
        setMapIds(mapIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMapIds();
  }, []);
};
