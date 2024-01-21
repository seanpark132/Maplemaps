import { Link } from "react-router-dom";

export default function RegionSelect() {
  return (
    <main>
      <h1>Select a Region:</h1>
      <div className="grid grid-cols-2 gap-16">
        <Link to="/arcane-river">
          <img className="" src="/arcane_river_maps/arcane_river.jpg" />
        </Link>
        <Link to="/grandis">
          <img src="/grandis_maps/grandis.jpg" />
        </Link>
      </div>
    </main>
  );
}
