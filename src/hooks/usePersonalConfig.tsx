import { useEffect } from "react";

export const usePersonalConfig = (
  configInputs: Record<string, number>,
  configCheckboxes: Record<string, boolean>,
  setConfigInputs: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  setConfigCheckboxes: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  setTotalBonusExpPercent: React.Dispatch<React.SetStateAction<number>>,
) => {
  const expValues = {
    "2x Coupon": 100,
    "3x Coupon": 200,
    "MVP/50% Coupon": 50,
    "MP Gold Potion": 10,
    "Exp Accum Potion": 10,
    "6 Dice": 30,
    "Real Holy Symbol": 50,
    "Decent Holy Symbol": 35,
  };

  useEffect(() => {
    const storedInputs = localStorage.getItem("configInputs");
    if (storedInputs) {
      let parsed = JSON.parse(storedInputs);
      for (let key in parsed) {
        if (parsed[key] === null) {
          parsed[key] = 0;
        }
      }
      setConfigInputs(parsed);
    }

    const storedCheckboxes = localStorage.getItem("configCheckboxes");
    if (storedCheckboxes) {
      setConfigCheckboxes(JSON.parse(storedCheckboxes));
    }
  }, []);

  useEffect(() => {
    const inputSum = Object.values(configInputs)
      .slice(3)
      .reduce((acc, item) => {
        if (item) {
          return acc + item;
        }
        return acc;
      }, 0);

    const boolSum = Object.entries(expValues).reduce((acc, item) => {
      if (configCheckboxes[item[0]]) {
        return acc + item[1];
      }
      return acc;
    }, 0);

    setTotalBonusExpPercent(inputSum + boolSum);
  }, [configInputs, configCheckboxes]);
};
