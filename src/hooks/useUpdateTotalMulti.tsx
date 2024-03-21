import { useEffect } from "react";
import { ConfigState } from "../types/dataTypes";

export const useUpdateTotalMulti = (
  ratesConfig: ConfigState,
  setTotalMulti: React.Dispatch<React.SetStateAction<number>>,
) => {
  useEffect(() => {
    const additiveSum = Object.values(ratesConfig.expAdditive).reduce(
      (acc: number, item: number) => acc + Number(item),
      0,
    );

    const multiSum = Object.values(ratesConfig.expMulti).reduce(
      (acc: number, item: number) => acc * item,
      1,
    );

    const totalMulti = Math.round(100 * (additiveSum / 100 + multiSum)) / 100;

    setTotalMulti(totalMulti);
  }, [ratesConfig]);
};
