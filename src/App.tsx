import { Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import NoPage from "./pages/NoPage";
import Loading from "./pages/Loading";
import { WorldMapData } from "./types/worldMapTypes";
import { MapData } from "./types/mapTypes";
import { MobData } from "./types/mobTypes";
import { useFetchMapIds } from "./hooks/useFetchMapIds";

const MapInfo = lazy(() => import("./pages/MapInfo"));

function App() {
  const [worldMapsData, setWorldMapsData] = useState<
    Record<string, WorldMapData>
  >({});
  const [visitedWorldMaps, setVisitedWorldMaps] = useState<Set<string>>(
    new Set(),
  );
  const [mapsData, setMapsData] = useState<Record<number, MapData>>({});
  const [mobsData, setMobsData] = useState<Record<number, MobData>>({});
  const [mapIds, setMapIds] = useState<number[]>([]);

  useFetchMapIds(setMapIds);
  return (
    <>
      <div className="flex w-full flex-col justify-center p-4 lg:p-6">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              index
              element={
                <WorldMaps
                  worldMapsData={worldMapsData}
                  visitedWorldMaps={visitedWorldMaps}
                  mapsData={mapsData}
                  mobsData={mobsData}
                  setWorldMapsData={setWorldMapsData}
                  setVisitedWorldMaps={setVisitedWorldMaps}
                  setMapsData={setMapsData}
                  setMobsData={setMobsData}
                />
              }
            />
            {mapIds.map((id) => (
              <Route
                key={id}
                path={`/map/${id}`}
                element={
                  <Suspense fallback={<Loading />}>
                    <MapInfo
                      id={id}
                      mapIds={mapIds}
                      mapsData={mapsData}
                      mobsData={mobsData}
                    />
                  </Suspense>
                }
              />
            ))}
            {mapIds.length === 0 ? (
              <Route path="*" element={<Loading />} />
            ) : (
              <Route path="*" element={<NoPage />} />
            )}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
