import { useState, useEffect } from "react";
import ExpSourcesGrid from "./ExpSourcesGrid";

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

  const [boolExpSources, setBoolExpSources] = useState<Record<string, boolean>>(
    {
      "2x Coupon": false,
      "3x Coupon": false,
      "MVP/50% Coupon": false,
      "MP Gold Potion": false,
      "Exp Accum Potion": false,
      "6 Dice": false,
      "Real Holy Symbol": false,
      "Decent Holy Symbol": false,
    },
  );

  const expValues = {
    "2x Coupon": 100,
    "3x Coupon": 200,
    "MVP/50% Coupon": boolExpSources["2x Coupon"]
      ? 100
      : boolExpSources["3x Coupon"]
        ? 150
        : 50,
    "MP Gold Potion": 10,
    "Exp Accum Potion": 10,
    "6 Dice": 30,
    "Real Holy Symbol": 50,
    "Decent Holy Symbol": 35,
  };

  useEffect(() => {
    const inputSum = Object.values(inputExpSources).reduce((acc, item) => {
      if (item) {
        return acc + item;
      }
      return acc;
    }, 0);

    const boolSum = Object.entries(expValues).reduce((acc, item) => {
      if (boolExpSources[item[0]]) {
        return acc + item[1];
      }
      return acc;
    }, 0);

    props.setTotalBonusExpPercent(inputSum + boolSum);
  }, [inputExpSources, boolExpSources]);

  return (
    <span className="w-fit">
      <ExpSourcesGrid
        totalBonusExpPercent={props.totalBonusExpPercent}
        inputExpSources={inputExpSources}
        boolExpSources={boolExpSources}
        setInputExpSources={setInputExpSources}
        setBoolExpSources={setBoolExpSources}
      />
    </span>
  );
}
