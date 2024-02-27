import { useState } from "react";
import PersonalConfigGrid from "./PersonalConfigGrid";
import { usePersonalConfig } from "../hooks/usePersonalConfig";

type Props = {
  configInputs: Record<string, number>;
  setConfigInputs: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  totalBonusExpPercent: number;
  setTotalBonusExpPercent: React.Dispatch<React.SetStateAction<number>>;
};
export default function PersonalConfig(props: Props) {
  const [configCheckboxes, setConfigCheckboxes] = useState<
    Record<string, boolean>
  >({
    "2x Coupon": false,
    "3x Coupon": false,
    "MVP/50% Coupon": false,
    "MP Gold Potion": false,
    "Exp Accum Potion": false,
    "6 Dice": false,
    "Real Holy Symbol": false,
    "Decent Holy Symbol": false,
  });

  usePersonalConfig(
    props.configInputs,
    configCheckboxes,
    props.setConfigInputs,
    setConfigCheckboxes,
    props.setTotalBonusExpPercent,
  );

  return (
    <span className="w-fit">
      <PersonalConfigGrid
        totalBonusExpPercent={props.totalBonusExpPercent}
        configInputs={props.configInputs}
        configCheckboxes={configCheckboxes}
        setConfigInputs={props.setConfigInputs}
        setConfigCheckboxes={setConfigCheckboxes}
      />
    </span>
  );
}
