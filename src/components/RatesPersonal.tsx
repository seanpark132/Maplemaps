import PersonalConfigGrid from "./PersonalConfigGrid";
import InfoGrid from "./InfoGrid";
import { useState, useMemo } from "react";
import {
  LEVEL_EXP_MULTIPLIER,
  LEVEL_MESO_MULTIPLIER,
} from "../utils/ratesConstants";
import { usePersonalConfig } from "../hooks/usePersonalConfig";

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
  const [configInputs, setConfigInputs] = useState<Record<string, number>>({
    "Character Level": 0,
    "Meso Obtained %": 0,
    "Custom mobs/hr": props.hourlyMobs,
    "Burning %": 0,
    "Legion Exp ": 0,
    "Zero Legion Block": 0,
    "Hyper Stat": 0,
    "Mercedes Link": 0,
    "Event Passive": 0,
    "Pendant of Spirit": 0,
    "Other Exp Bonuses": 0,
  });

  const [selectedRuneValue, setSelectedRuneValue] = useState<number>(0);

  const [configCheckboxes, setConfigCheckboxes] = useState<
    Record<string, boolean>
  >({
    "2x Coupon": false,
    "3x Coupon": false,
    "MVP/50% Coupon": false,
    "MP Gold Potion": false,
    "Exp Accum Potion": false,
    "6 Dice": false,
    "Decent Holy Symbol": false,
    "Real Holy Symbol": false,
  });
  const [totalBonusExpPercent, setTotalBonusExpPercent] = useState<number>(0);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  const { levelExpMulti, levelMesoMulti } = useMemo(() => {
    if (configInputs["Character Level"] === 0) {
      return { levelExpMulti: 1, levelMesoMulti: 1 };
    }

    if (props.mobLevels.some((mobLevel) => mobLevel === undefined)) {
      return { levelExpMulti: 1, levelMesoMulti: 1 };
    }

    let expMultiSum = 0;
    let mesoMultiSum = 0;

    props.mobLevels.forEach((mobLevel) => {
      const levelDiff = configInputs["Character Level"] - mobLevel;
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
  }, [configInputs["Character Level"]]);

  usePersonalConfig(
    configInputs,
    configCheckboxes,
    selectedRuneValue,
    setConfigInputs,
    setConfigCheckboxes,
    setTotalBonusExpPercent,
    setSelectedRuneValue,
  );

  const descriptions = [
    "Exp/hr",
    "Meso/hr",
    "Meso/hr (Reboot)",
    "Mobs/hr",
    "Level Exp Multi",
    "Level Meso Multi",
  ];

  const hourlyMobsMulti = configInputs["Custom mobs/hr"] / props.hourlyMobs;

  const values = [
    Math.round(
      (props.expRate *
        levelExpMulti *
        hourlyMobsMulti *
        (100 + totalBonusExpPercent)) /
        100,
    ).toLocaleString("US"),
    Math.round(
      (props.mesoRate *
        levelMesoMulti *
        hourlyMobsMulti *
        (100 + configInputs["Meso Obtained %"])) /
        100,
    ).toLocaleString("US"),
    Math.round(
      (props.mesoRate *
        levelMesoMulti *
        hourlyMobsMulti *
        (100 + configInputs["Meso Obtained %"]) *
        6) /
        100,
    ).toLocaleString("US"),
    configInputs["Custom mobs/hr"].toLocaleString("US"),
    levelExpMulti,
    levelMesoMulti,
  ];

  return (
    <article className="h-fit w-fit rounded-lg border-2 p-4 md:p-6 xl:ml-8 2xl:p-8">
      <h2>Personal Rates:</h2>
      <button
        className="mb-5 mt-2.5 rounded border p-2 text-green-700 dark:text-green-400"
        onClick={() => setIsConfigOpen((prev) => !prev)}
      >
        {isConfigOpen
          ? "View Personal Rates"
          : "Click to configure personal rates"}
      </button>
      {isConfigOpen ? (
        <PersonalConfigGrid
          totalBonusExpPercent={totalBonusExpPercent}
          configInputs={configInputs}
          configCheckboxes={configCheckboxes}
          selectedRuneValue={selectedRuneValue}
          setConfigInputs={setConfigInputs}
          setConfigCheckboxes={setConfigCheckboxes}
          setSelectedRuneValue={setSelectedRuneValue}
        />
      ) : (
        <InfoGrid descriptions={descriptions} values={values} />
      )}
    </article>
  );
}
