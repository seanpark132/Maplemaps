import { useEffect } from "react";

export const useFetchMapIds = (
  setMapIds: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  useEffect(() => {
    const fetchMapIds = async () => {
      try {
        const req = new Request("/.netlify/functions/getMapIds", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
