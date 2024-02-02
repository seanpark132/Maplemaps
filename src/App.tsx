import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import Navbar from "./components/Navbar";

function App() {
  const [allWorldMapsData, setAllWorldMapsData] = useState([]);
  const [allMapsData, setAllMapsData] = useState([]);

  useEffect(() => {
    const fetchWorldMapsData = async () => {
      try {
        const response = await fetch("/.netlify/functions/getWorldMapsData");
        const data = await response.json();
        setAllWorldMapsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMapsData = async () => {
      try {
        const response = await fetch("/.netlify/functions/getmapsData");
        const data = await response.json();
        setAllMapsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorldMapsData();
    fetchMapsData();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" flex min-w-180 flex-col items-center justify-center p-6">
        <Routes>
          <Route
            index
            element={
              <WorldMaps
                allWorldMapsData={allWorldMapsData}
                allMapsData={allMapsData}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
