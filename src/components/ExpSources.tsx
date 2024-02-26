import { useState, useRef } from "react";
import ExpSourcesGrid from "./ExpSourcesGrid";
import { useExpSources } from "../hooks/useExpSources";

type Props = {
  totalBonusExpPercent: number;
  setTotalBonusExpPercent: React.Dispatch<React.SetStateAction<number>>;
};
export default function ExpSources(props: Props) {
  const [inputExpSources, setInputExpSources] = useState<
    Record<string, number>
  >({
    Burning: 0,
    "Legion Exp ": 0,
    "Zero Legion Block": 0,
    "Hyper Stat": 0,
    "Mercedes Link": 0,
    "Event Passive": 0,
    "Pendant of Spirit": 0,
  });

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

  const isFirstRender1 = useRef(true);
  const isFirstRender2 = useRef(true);

  useExpSources(
    inputExpSources,
    checkboxExpSources,
    isFirstRender1,
    isFirstRender2,
    setInputExpSources,
    setCheckboxExpSources,
    props.setTotalBonusExpPercent,
  );

  return (
    <span className="w-fit">
      <ExpSourcesGrid
        totalBonusExpPercent={props.totalBonusExpPercent}
        inputExpSources={inputExpSources}
        checkboxExpSources={checkboxExpSources}
        setInputExpSources={setInputExpSources}
        setCheckboxExpSources={setCheckboxExpSources}
      />
    </span>
  );
}
