import InfoGrid from "./InfoGrid";
import { useState, useMemo } from "react";
import {
  LEVEL_EXP_MULTIPLIER,
  LEVEL_MESO_MULTIPLIER,
} from "../utils/ratesConstants";
import { useConfig } from "../context/ConfigContext";

type Props = {
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
    String(props.hourlyMobs),
  );

  let { totalMulti, level, mesoObtained } = useConfig();

  if (typeof level === "string") {
    level = 0;
  }
  if (typeof mesoObtained === "string") {
    mesoObtained = 0;
  }

  const { levelExpMulti, levelMesoMulti } = useMemo(() => {
    if (level) {
      return { levelExpMulti: 1, levelMesoMulti: 1 };
    }

    if (props.mobLevels.some((mobLevel) => mobLevel === undefined)) {
      return { levelExpMulti: 1, levelMesoMulti: 1 };
    }

    let expMultiSum = 0;
    let mesoMultiSum = 0;

    props.mobLevels.forEach((mobLevel) => {
      const levelDiff = (level as number) - mobLevel;
      if (levelDiff > 40) {
        expMultiSum += 0.7;
      } else if (levelDiff < -36) {
        expMultiSum += 0.1;
      } else {
        expMultiSum += LEVEL_EXP_MULTIPLIER[String(levelDiff)];
      }

      if (String(levelDiff) in LEVEL_MESO_MULTIPLIER) {
        mesoMultiSum += LEVEL_MESO_MULTIPLIER[String(levelDiff)];
      }
    });

    const avgExpMulti =
      Math.round((expMultiSum / props.mobLevels.length) * 100) / 100;
    const avgMesoMulti =
      Math.round((mesoMultiSum / props.mobLevels.length) * 100) / 100;
    return { levelExpMulti: avgExpMulti, levelMesoMulti: avgMesoMulti };
  }, [level]);

  const descriptions = [
    "Exp/hr",
    "Meso/hr",
    "Character Level",
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
        (100 + mesoObtained)) /
        100,
    ).toLocaleString("US"),
    level,
    levelExpMulti,
    levelMesoMulti,
    totalMulti,
    levelExpMulti * totalMulti,
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
    </article>
  );

  function handleCustomHourlyMobs(e: any) {
    const { value, max } = e.target;

    let parsed: number = Number(value);
    if (isNaN(parsed)) {
      parsed = 0;
    } else if (max && parsed > max) {
      parsed = max;
    }
    setCustomHourlyMobs(String(parsed));
  }
}
