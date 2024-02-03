import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import Navbar from "./components/Navbar";

function App() {
  const [worldMapsData, setWorldMapsData] = useState([]);
  const [mapsData, setMapsData] = useState([]);

  useEffect(() => {
    const fetchWorldMapsData = async () => {
      try {
        const response = await fetch("/.netlify/functions/getWorldMapsData");
        const data = await response.json();
        setWorldMapsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMapsData = async () => {
      try {
        const response = await fetch("/.netlify/functions/getMapsData");
        const data = await response.json();
        setMapsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorldMapsData();
    // fetchMapsData();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" flex min-w-180 flex-col items-center justify-center p-6">
        <Routes>
          <Route
            index
            element={
              <WorldMaps worldMapsData={worldMapsData} mapsData={mapsData} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
