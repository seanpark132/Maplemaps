import { useState } from "react";
import ExpSourcesGrid from "./ExpSourcesGrid";
import { useExpSources } from "../hooks/useExpSources";

type Props = {
  inputExpSources: Record<string, number>;
  setInputExpSources: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  totalBonusExpPercent: number;
  setTotalBonusExpPercent: React.Dispatch<React.SetStateAction<number>>;
};
export default function ExpSources(props: Props) {
  const [checkboxExpSources, setCheckboxExpSources] = useState<
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

  useExpSources(
    props.inputExpSources,
    checkboxExpSources,
    props.setInputExpSources,
    setCheckboxExpSources,
    props.setTotalBonusExpPercent,
  );

  return (
    <span className="w-fit">
      <ExpSourcesGrid
        totalBonusExpPercent={props.totalBonusExpPercent}
        inputExpSources={props.inputExpSources}
        checkboxExpSources={checkboxExpSources}
        setInputExpSources={props.setInputExpSources}
        setCheckboxExpSources={setCheckboxExpSources}
      />
    </span>
  );
}
