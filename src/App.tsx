import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegionSelect from "./pages/RegionSelect";
import ArcaneRiver from "./pages/ArcaneRiver";
import Grandis from "./pages/Grandis";

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Routes>
        <Route index element={<RegionSelect />} />
        <Route path="/arcane-river" element={<ArcaneRiver />} />
        <Route path="/grandis" element={<Grandis />} />
      </Routes>
    </div>
  );
}

export default App;
