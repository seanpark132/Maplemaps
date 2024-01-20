import { Link } from "react-router-dom";

export default function RegionSelect() {
  return (
    <main>
      <h1>Select a Region:</h1>
      <Link to="/arcane-river">
        <img src="/arcane_river_maps/arcane_river.jpg" />
      </Link>
      <Link to="/grandis">
        <img src="/grandis_maps/grandis.jpg" />
      </Link>
    </main>
  );
}
