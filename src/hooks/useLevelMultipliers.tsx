import { useMemo } from "react";
import {
  LEVEL_EXP_MULTIPLIER,
  LEVEL_MESO_MULTIPLIER,
} from "../utils/ratesConstants";

export function useLevelMultipliers(levelAsNum: number, mobLevels: number[]) {
  return useMemo(() => {
    if (!levelAsNum || mobLevels.some((mobLevel) => mobLevel === undefined)) {
      return { levelExpMulti: 1, levelMesoMulti: 1 };
    }

    let expMultiSum = 0;
    let mesoMultiSum = 0;

    mobLevels.forEach((mobLevel) => {
      const levelDiff = levelAsNum - mobLevel;
      if (levelDiff > 40) {
        expMultiSum += 0.7;
      } else if (levelDiff < -36) {
        expMultiSum += 0.1;
      } else {
        expMultiSum += LEVEL_EXP_MULTIPLIER[String(levelDiff)];
      }

      if (String(levelDiff) in LEVEL_MESO_MULTIPLIER) {
        mesoMultiSum += LEVEL_MESO_MULTIPLIER[String(levelDiff)];
      }
    });

    const avgExpMulti =
      Math.round((expMultiSum / mobLevels.length) * 100) / 100;
    const avgMesoMulti =
      Math.round((mesoMultiSum / mobLevels.length) * 100) / 100;
    return { levelExpMulti: avgExpMulti, levelMesoMulti: avgMesoMulti };
  }, [levelAsNum, mobLevels]);
}
