export default function About() {
  return (
    <main className="p-6">
      <div className="xl:w-1/2">
        <h1 className="mb-2">What is MapleMaps?</h1>
        <p>
          MapleMaps is a website built to give Maplestory players better
          insights on training map rates. The world map for this website was
          made to function similarly to the one in-game. You can click on
          different areas to traverse the world map, and right click to go to
          the previous world map. Hover a map dot to see basic information of
          the map, and click to go to the map's page.
        </p>
        <p className="my-4">Each map page has the following:</p>
        <ul className="list-disc px-6">
          <li>
            <p>
              An image of the layout (Lvl 200+ areas have mob spawn layouts as
              well)
            </p>
          </li>
          <li>
            <p>Mob details (level, exp, hp)</p>
          </li>
          <li>
            <p>Base rates for the map (Mobs/hr, Exp/hr, Meso/hr, etc)</p>
          </li>
          <li>
            <p>
              A customizable personal rates section where you can put your
              character level, % meso obtained, mobs/hr, and bonus EXP sources
              to calculate the map's rates for your character
            </p>
          </li>
        </ul>
        <h1 className="mb-2 mt-8">Methodology</h1>
        <p>
          For reference, here is a list of how this website calculates each rate
          value.
        </p>
        <ul className="list-disc px-6 py-4">
          <li>
            <p>Mobs/hr : 480 * capacity/gen</p>
          </li>
          <li>
            <p>
              Mobs/hr (Instanced): 480 * min(capacity/gen + 1, spawn points)
            </p>
          </li>
          <li>
            <p>Mobs/hr (Frenzy): 1666 * min(1.7 * capacity, spawn points)</p>
          </li>
          <li>
            <p>Meso/hr: 7.5 * (Mobs/hr) * (Average mob level)</p>
          </li>
          <li>
            <p>Meso/hr (reboot): 6 * (Meso/hr)</p>
          </li>
        </ul>
        <h2>ENJOY!</h2>
      </div>
    </main>
  );
}
