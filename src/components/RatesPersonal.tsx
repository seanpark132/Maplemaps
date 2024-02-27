import PersonalConfig from "./PersonalConfig";
import InfoGrid from "./InfoGrid";
import { useState } from "react";

type Props = {
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
    Burning: 0,
    "Legion Exp ": 0,
    "Zero Legion Block": 0,
    "Hyper Stat": 0,
    "Mercedes Link": 0,
    "Event Passive": 0,
    "Pendant of Spirit": 0,
  });
  const [totalBonusExpPercent, setTotalBonusExpPercent] = useState<number>(0);
  const [isExpSourcesOpen, setIsExpSourcesOpen] = useState<boolean>(false);

  const descriptions = [
    "Mobs / hour",
    "Exp / hour",
    "Meso / hour",
    "Meso / hour (reboot)",
  ];

  const values = [
    props.hourlyMobs.toLocaleString("US"),
    props.expRate.toLocaleString("US"),
    props.mesoRate.toLocaleString("US"),
    (props.mesoRate * 6).toLocaleString("US"),
  ];

  return (
    <article className="h-fit w-fit rounded-lg border-2 p-4 md:ml-8 md:p-8">
      <h2>Personal Rates:</h2>
      <button
        className="mb-4 mt-2 rounded border p-2 text-green-700 dark:text-green-400"
        onClick={() => setIsExpSourcesOpen((prev) => !prev)}
      >
        {isExpSourcesOpen
          ? "View Personal Rates"
          : "Click to configure personal rates"}
      </button>
      {isExpSourcesOpen ? (
        <PersonalConfig
          configInputs={configInputs}
          setConfigInputs={setConfigInputs}
          totalBonusExpPercent={totalBonusExpPercent}
          setTotalBonusExpPercent={setTotalBonusExpPercent}
        />
      ) : (
        <InfoGrid descriptions={descriptions} values={values} />
      )}
    </article>
  );
}
