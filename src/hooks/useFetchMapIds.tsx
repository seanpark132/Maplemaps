import { useEffect } from "react";

export const useFetchMapIds = (
  setMapIds: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  useEffect(() => {
    const fetchMapIds = async () => {
      try {
        const req = new Request(
          "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reqType: "mapIds",
              secret: import.meta.env.VITE_SECRET,
            }),
          },
        );

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
