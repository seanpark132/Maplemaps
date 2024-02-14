import { Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import NoPage from "./pages/NoPage";
import Loading from "./pages/Loading";
import { MapData } from "./types/mapTypes";
import { MobData } from "./types/mobTypes";

const MapInfo = lazy(() => import("./pages/MapInfo"));

function App() {
  const [mapsData, setMapsData] = useState<Record<number, MapData>>({});
  const [mobsData, setMobsData] = useState<Record<number, MobData>>({});

  return (
    <>
      <div className="flex w-full flex-col justify-center p-4 lg:p-6">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              index
              element={
                <WorldMaps
                  mapsData={mapsData}
                  mobsData={mobsData}
                  setMapsData={setMapsData}
                  setMobsData={setMobsData}
                />
              }
            />
            {/* likely need an array of just map_ids*/}
            {/* {mapsData &&
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
              ))} */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
