import { Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import { WorldMapData } from "./types/worldMapTypes";
import { TEMP_MAPS_DATA } from "./TEMP_mapsData";
import { TEMP_WORLD_MAPS_DATA } from "./TEMP_worldMapsData";
import NoPage from "./pages/NoPage";
import Loading from "./pages/Loading";

const MapInfo = lazy(() => import("./pages/MapInfo"));

function App() {
  const [worldMapsData, setWorldMapsData] = useState<WorldMapData[]>([]);
  const [mapsData, setMapsData] = useState<any[]>([]);

  useEffect(() => {
    //   const fetchWorldMapsData = async () => {
    //     try {
    //       const response = await fetch("/.netlify/functions/getWorldMapsData");
    //       const data = await response.json();
    //       setWorldMapsData(data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    // const fetchMapsData = async () => {
    //   try {
    //     const response = await fetch("/.netlify/functions/getMapsData");
    //     const data = await response.json();
    //     setMapsData(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchWorldMapsData();
    setWorldMapsData(TEMP_WORLD_MAPS_DATA);
    setMapsData(TEMP_MAPS_DATA);
    // fetchMapsData();
  }, []);

  if (!mapsData || !worldMapsData) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex w-full min-w-180 flex-col items-center justify-center p-6">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              index
              element={
                <WorldMaps worldMapsData={worldMapsData} mapsData={mapsData} />
              }
            />
            {mapsData &&
              mapsData.map((map) => (
                <Route
                  key={map.map_id}
                  path={`/map/${map.map_id}`}
                  element={
                    <Suspense fallback={<Loading />}>
                      <MapInfo mapData={map} />
                    </Suspense>
                  }
                />
              ))}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
