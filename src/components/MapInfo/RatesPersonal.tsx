import InfoGrid from "./InfoGrid";
import { useState } from "react";
import { useConfig } from "../../context/ConfigContext";
import { useLevelMultipliers } from "../../hooks/useLevelMultipliers";
import { Link } from "react-router-dom";

type Props = {
  mapId: number;
  mobLevels: number[];
  hourlyMobs: number;
  expRate: number;
  mesoRate: number;
  arcaneForce: number | undefined;
  sacredForce: number | undefined;
  starForce: number | undefined;
};

export default function RatesPersonal(props: Props) {
  const [customHourlyMobs, setCustomHourlyMobs] = useState<string>(
    localStorage.getItem(`${String(props.mapId)}_custom_mobs`) ||
      String(props.hourlyMobs),
  );

  let { totalMulti, level, mesoObtained } = useConfig();

  const levelAsNum = Number(level);
  const mesoObtainedAsNum = Number(mesoObtained);

  const { levelExpMulti, levelMesoMulti } = useLevelMultipliers(
    levelAsNum,
    props.mobLevels,
  );

  const descriptions = [
    "Exp/hr",
    "Meso/hr",
    "Character Level",
    "Meso Obtained %",
    "Level Exp Multi",
    "Level Meso Multi",
    "Config Exp Multi",
    "Total Exp Multi",
  ];

  let customHourlyMobsNumber: number;
  if (customHourlyMobs === "") {
    customHourlyMobsNumber = 0;
  } else {
    customHourlyMobsNumber = Number(customHourlyMobs);
  }

  const hourlyMobsMulti = customHourlyMobsNumber / props.hourlyMobs;
  const values = [
    Math.round(
      props.expRate * levelExpMulti * hourlyMobsMulti * totalMulti,
    ).toLocaleString("US"),
    Math.round(
      (props.mesoRate *
        levelMesoMulti *
        hourlyMobsMulti *
        (100 + mesoObtainedAsNum)) /
        100,
    ).toLocaleString("US"),
    level,
    mesoObtained,
    levelExpMulti,
    levelMesoMulti,
    totalMulti,
    Math.round(100 * levelExpMulti * totalMulti) / 100,
  ];

  return (
    <article className="h-fit w-fit rounded-lg border-2 p-4 md:p-6 xl:ml-8 2xl:p-8">
      <h2 className="mb-4">Personal Rates:</h2>
      <label className="font-bold" htmlFor="customHourlyMobs">
        Custom Mobs/hr:
      </label>
      <input
        className="mb-5 ml-4 w-24 rounded border-2 px-2 py-1"
        type="number"
        name="customHourlyMobs"
        id="customHourlyMobs"
        max={999999}
        value={customHourlyMobs}
        onChange={handleCustomHourlyMobs}
      />
      <InfoGrid descriptions={descriptions} values={values} />
      <p className="mb-2 mt-4 w-64 text-wrap">
        * To configure your character level/ meso obtained/ exp multipliers,
        please visit the{" "}
        <Link to="/rates-config" className="font-semibold underline">
          Rates Config Page.
        </Link>
      </p>
    </article>
  );

  function handleCustomHourlyMobs(e: any) {
    const { value, max } = e.target;

    let valAsNumber = Number(value);
    if (isNaN(valAsNumber)) {
      valAsNumber = 0;
    } else if (max && valAsNumber > max) {
      valAsNumber = max;
    }

    const valAsString = String(valAsNumber);

    localStorage.setItem(`${String(props.mapId)}_custom_mobs`, valAsString);
    setCustomHourlyMobs(valAsString);
  }
}
