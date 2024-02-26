import { useEffect } from "react";

export const useExpSources = (
  inputExpSources: Record<string, number>,
  checkboxExpSources: Record<string, boolean>,
  isFirstRender: React.MutableRefObject<boolean>,
  setInputExpSources: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >,
  setCheckboxExpSources: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  setTotalBonusExpPercent: React.Dispatch<React.SetStateAction<number>>,
) => {
  const expValues = {
    "2x Coupon": 100,
    "3x Coupon": 200,
    "MVP/50% Coupon": checkboxExpSources["2x Coupon"]
      ? 100
      : checkboxExpSources["3x Coupon"]
        ? 150
        : 50,
    "MP Gold Potion": 10,
    "Exp Accum Potion": 10,
    "6 Dice": 30,
    "Real Holy Symbol": 50,
    "Decent Holy Symbol": 35,
  };

  useEffect(() => {
    const storedInputs = localStorage.getItem("inputExpSources");
    if (storedInputs) {
      setInputExpSources(JSON.parse(storedInputs));
    }

    const storedCheckboxes = localStorage.getItem("checkboxExpSources");
    if (storedCheckboxes) {
      setCheckboxExpSources(JSON.parse(storedCheckboxes));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("inputExpSources", JSON.stringify(inputExpSources));
  }, [inputExpSources]);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(
      "checkboxExpSources",
      JSON.stringify(checkboxExpSources),
    );
  }, [checkboxExpSources]);

  useEffect(() => {
    const inputSum = Object.values(inputExpSources).reduce((acc, item) => {
      if (item) {
        return acc + item;
      }
      return acc;
    }, 0);

    const boolSum = Object.entries(expValues).reduce((acc, item) => {
      if (checkboxExpSources[item[0]]) {
        return acc + item[1];
      }
      return acc;
    }, 0);

    setTotalBonusExpPercent(inputSum + boolSum);
  }, [inputExpSources, checkboxExpSources]);
};
