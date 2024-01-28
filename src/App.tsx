import { Routes, Route } from "react-router-dom";
import "./App.css";
import WorldMaps from "./pages/WorldMaps";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-6">
        <Routes>
          <Route index element={<WorldMaps />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
