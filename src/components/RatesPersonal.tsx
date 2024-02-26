import ExpSources from "./ExpSources";
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
  const [userLevel, setUserLevel] = useState<number>(0);
  const [totalMesoPercent, setTotalMesoPercent] = useState<number>(0);
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
          : "Click here to add bonus EXP sources"}
      </button>
      {isExpSourcesOpen ? (
        <ExpSources
          totalBonusExpPercent={totalBonusExpPercent}
          setTotalBonusExpPercent={setTotalBonusExpPercent}
        />
      ) : (
        <InfoGrid descriptions={descriptions} values={values} />
      )}
    </article>
  );
}
