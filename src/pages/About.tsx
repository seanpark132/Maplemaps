import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="flex p-6 xl:p-12">
      <div className="lg:w-1/2 2xl:mr-16 2xl:w-2/5">
        <h1 className="mb-2">What is MapleMaps?</h1>
        <p>
          MapleMaps is a website built to give Maplestory players better
          insights on training maps. <br />
          The world map on this website functions similarly to the one in-game.
          You can click on different areas to traverse the world map, and right
          click to go to the previous world map. Click a map's dot to go to the
          map's page.
        </p>
        <p className="my-4">Each map page has the following:</p>
        <ul className="list-disc px-6">
          <li>
            <p>An image of the map and mob spawn layout.</p>
          </li>
          <li>
            <p>Mob details (level, exp, hp)</p>
          </li>
          <li>
            <p>Base rates for the map (Mobs/hr, Exp/hr, Meso/hr, etc)</p>
          </li>
          <li>
            <p>
              A personal rates section. To customize the rates to your setup,
              visit the{" "}
              <Link to="/rates-config" className="font-semibold underline">
                Rates Config Page.
              </Link>{" "}
            </p>
          </li>
        </ul>
        <h1 className="mb-2 mt-8">Notes</h1>
        <p>Next map update: Dreamer patch.</p>
        <br></br>
        <p>
          Cap/Gen and Capacity numbers were taken from this spreadsheet:
          <a
            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5lCPppCU8Mc10n21X26twPaN6npLU_wqnYuBomtQyRysjlALs5_qcDV0RtLSIVOlHwGTGV1Cxq62Y/pubhtml?gid=644887954#"
            target="_blank"
            className="ml-2 underline"
          >
            Link
          </a>
          <br />
          <br />
          For reference, here is a list of how each rate value is calculated:
        </p>
        <ul className="list-disc px-6 py-2">
          <li>
            <p>Mobs/hr : 480 * capacity/gen</p>
          </li>
          <li>
            <p>
              Mobs/hr (Instanced): 480 * min(capacity/gen + 1, spawn points)
            </p>
          </li>
          <li>
            <p>
              Mobs/hr (Frenzy): 1666 * min(1.7 * capacity, spawn points, 49)
            </p>
          </li>
          <li>
            <p>Meso/hr: 7.5 * (Mobs/hr) * (Average mob level)</p>
          </li>
        </ul>
      </div>
      <div className="xl:w-1/3 xl:px-12">
        {/* <img src="/about.webp" className=" hidden max-h-180 xl:block" /> */}
      </div>
    </main>
  );
}
