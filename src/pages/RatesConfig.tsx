import { useState } from "react";
import ConfigExpMulti from "../components/ConfigExpMulti";
import ConfigExpAdditive from "../components/ConfigExpAdditive";
import { ConfigState } from "../types/dataTypes";
import ConfigInfo from "../components/ConfigInfo";

export default function RatesConfig() {
  const [ratesConfig, setRatesConfig] = useState<ConfigState>({
    totalMulti: 1,
    level: 0,
    mesoObtained: 0,
    expMulti: { cashShop: 1, useCoupon: 1, torment: 1 },
    expAdditive: {
      mvp: 0,
      mpGold: 0,
      expAcc: 0,
      vip: 0,
      burning: 0,
      rune: 0,
      pendant: 0,
      merc: 0,
      zero: 0,
      dice: 0,
      legionBoard: 0,
      event: 0,
      hyper: 0,
      holySymbol: 0,
      other: 0,
    },
  });

  return (
    <main className="flex w-full flex-col lg:p-6 lg:pt-0">
      <h3>
        Input your character level, meso obtained %, and bonus exp sources on
        this page. They will be applied to the personal rates section for each
        map.
      </h3>
      <form className="mt-6 flex flex-wrap">
        <div className="mr-28 flex flex-col">
          <ConfigInfo
            ratesConfig={ratesConfig}
            setRatesConfig={setRatesConfig}
          />
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
