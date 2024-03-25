import { Routes, Route } from "react-router-dom";
import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import NoPage from "./pages/NoPage";
import Loading from "./pages/Loading";
import { WorldMapData, MapData, MobData, MapIdsNames } from "./types/dataTypes";
import { useFetchMapIdsNames } from "./hooks/useFetchMapIdsNames.tsx";
import About from "./pages/About";
import Error from "./pages/Error";
import MapInfo from "./pages/MapInfo";
import RatesConfig from "./pages/RatesConfig";
import Navbar from "./components/Navbar.tsx";
import RegionSelect from "./pages/RegionSelect.tsx";

function App() {
  const [worldMapsData, setWorldMapsData] = useState<
    Record<string, WorldMapData>
  >({});
  const [visitedRegions, setVisitedRegions] = useState<string[]>([]);
  const [mapsData, setMapsData] = useState<Record<number, MapData>>({});
  const [mobsData, setMobsData] = useState<Record<number, MobData>>({});
  const [mapIdsNames, setMapIdsNames] = useState<MapIdsNames[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useFetchMapIdsNames(setMapIdsNames, setIsError);

  if (isError) {
    return (
      <>
        <Navbar mapIdsNames={mapIdsNames} />
        <Error />
      </>
    );
  }

  return (
    <>
      <Navbar mapIdsNames={mapIdsNames} />
      <div className="flex w-full flex-col justify-center">
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<RegionSelect />} />
              <Route
                path="/world-map"
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
              {mapIdsNames.map((obj) => (
                <Route
                  key={obj.map_id}
                  path={`/map/${obj.map_id}`}
                  element={
                    <MapInfo
                      key={obj.map_id}
                      map_id={obj.map_id}
                      mapIdsNames={mapIdsNames}
                      mapsData={mapsData}
                      mobsData={mobsData}
                      setIsError={setIsError}
                    />
                  }
                />
              ))}
              {mapIdsNames.length === 0 ? (
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
