import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import Navbar from "./components/Navbar";

function App() {
  const [allWorldMapsData, setAllWorldMapsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/.netlify/functions/getWorldMapsData");
        const data = await response.json();
        setAllWorldMapsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-6">
        <Routes>
          <Route
            index
            element={<WorldMaps allWorldMapsData={allWorldMapsData} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
