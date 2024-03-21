import { Routes, Route } from "react-router-dom";
import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import NoPage from "./pages/NoPage";
import Loading from "./pages/Loading";
import { WorldMapData, MapData, MobData } from "./types/dataTypes";
import { useFetchMapIds } from "./hooks/useFetchMapIds";

import About from "./pages/About";
import Error from "./pages/Error";
import MapInfo from "./pages/MapInfo";
import RatesConfig from "./pages/RatesConfig";

function App() {
  const [worldMapsData, setWorldMapsData] = useState<
    Record<string, WorldMapData>
  >({});
  const [visitedRegions, setVisitedRegions] = useState<string[]>([]);
  const [mapsData, setMapsData] = useState<Record<number, MapData>>({});
  const [mobsData, setMobsData] = useState<Record<number, MobData>>({});
  const [mapIds, setMapIds] = useState<number[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useFetchMapIds(setMapIds, setIsError);

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <div className="flex w-full flex-col justify-center p-4 lg:p-6">
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                index
                element={
                  <WorldMaps
                    worldMapsData={worldMapsData}
                    visitedRegions={visitedRegions}
                    mapsData={mapsData}
                    mobsData={mobsData}
                    setWorldMapsData={setWorldMapsData}
                    setVisitedRegions={setVisitedRegions}
                    setMapsData={setMapsData}
                    setMobsData={setMobsData}
                    setIsError={setIsError}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/rates-config" element={<RatesConfig />} />
              {mapIds.map((id) => (
                <Route
                  key={id}
                  path={`/map/${id}`}
                  element={
                    <MapInfo
                      id={id}
                      mapIds={mapIds}
                      mapsData={mapsData}
                      mobsData={mobsData}
                      setIsError={setIsError}
                    />
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
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
