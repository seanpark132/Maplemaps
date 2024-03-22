import { useEffect, useRef } from "react";
import { ConfigState } from "../types/dataTypes";

export const useConfigEffects = (
  ratesConfig: ConfigState,
  setTotalMulti: React.Dispatch<React.SetStateAction<number>>,
) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    const additiveSum = Object.values(ratesConfig.expAdditive).reduce(
      (acc: number, item: number | string) => acc + Number(item),
      0,
    );
    const multiSum = Object.values(ratesConfig.expMulti).reduce(
      (acc: number, item: number | string) => acc * Number(item),
      1,
    );
    const totalMulti = Math.round(100 * (additiveSum / 100 + multiSum)) / 100;

    setTotalMulti(totalMulti);
    if (!isFirstRun.current) {
      localStorage.setItem("ratesConfig", JSON.stringify(ratesConfig));
      localStorage.setItem("totalMulti", String(totalMulti));
    } else {
      isFirstRun.current = false;
    }
  }, [ratesConfig]);
};
