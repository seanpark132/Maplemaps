import { useState } from "react";
import ConfigExpMulti from "../components/ConfigRates/ConfigExpMulti";
import ConfigExpAdditive from "../components/ConfigRates/ConfigExpAdditive";
import { ConfigState } from "../types/dataTypes";
import ConfigInfo from "../components/ConfigRates/ConfigInfo";
import { useConfig } from "../context/ConfigContext";
import { useConfigEffects } from "../hooks/useConfigEffects";

export default function RatesConfig() {
  // need to override default object if it exists in localStorage,
  // so that checked inputs can know if checked should be true on first render
  const [ratesConfig, setRatesConfig] = useState<ConfigState>(
    localStorage.getItem("ratesConfig")
      ? JSON.parse(localStorage.getItem("ratesConfig")!)
      : null || {
          expMulti: { useCoupon: "1", cashShop: "1", torment: "1" },
          expAdditive: {
            mvp: "0",
            mpGold: "0",
            expAcc: "0",
            vip: "0",
            burning: "0",
            rune: "0",
            pendant: "0",
            merc: "0",
            zero: "0",
            dice: "0",
            legionBoard: "0",
            event: "0",
            hyper: "0",
            holySymbol: "0",
            other: "0",
          },
        },
  );

  const {
    totalMulti,
    level,
    mesoObtained,
    setTotalMulti,
    setLevel,
    setMesoObtained,
  } = useConfig();

  useConfigEffects(ratesConfig, setTotalMulti);

  return (
    <main className="flex w-full flex-col">
      <h3>
        Input your character level, meso obtained %, and bonus exp sources on
        this page. They will be applied to the personal rates section for each
        map.
      </h3>
      <form className="mt-6 flex flex-wrap">
        <div className="flex flex-col sm:mr-28">
          <ConfigInfo
            totalMulti={totalMulti}
            level={level}
            mesoObtained={mesoObtained}
            ratesConfig={ratesConfig}
            setLevel={setLevel}
            setMesoObtained={setMesoObtained}
            setRatesConfig={setRatesConfig}
          />
          <p className="mt-4 w-80">
            * Note that combo orbs, class-specific exp buffs, and event skills
            that give bonus exp are not accounted for.
          </p>
          <ConfigExpMulti
            ratesConfig={ratesConfig}
            setRatesConfig={setRatesConfig}
          />
        </div>
        <ConfigExpAdditive
          ratesConfig={ratesConfig}
          setRatesConfig={setRatesConfig}
        />
      </form>
    </main>
  );
}
