import InputNumber from "./InputNumber";
import { ConfigState } from "../types/dataTypes";

type Props = {
  ratesConfig: ConfigState;
  setRatesConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
};

export default function ConfigInfo(props: Props) {
  return (
    <section className="flex">
      <div className="mr-4 flex flex-col">
        <InputNumber
          label="Character Level"
          name="level"
          max={300}
          value={props.ratesConfig.level}
          handlerFnc={handleChange}
        />
        <InputNumber
          label="Meso Obtained %"
          name="mesoObtained"
          max={3000}
          value={props.ratesConfig.mesoObtained}
          handlerFnc={handleChange}
        />
      </div>
      <div className="flex flex-col items-center rounded-xl border p-4">
        <h3>Total Exp Multiplier</h3>
        <p className="pt-2 text-6xl font-bold text-green-700 dark:text-green-400 ">
          {props.ratesConfig.totalMulti}
        </p>
      </div>
    </section>
  );

  function handleChange(e: any) {
    const { name, value, max } = e.target;
    let parsed: number | string = parseInt(value);
    if (isNaN(parsed)) {
      parsed = "";
    } else if (max && parsed > max) {
      parsed = max;
    }
    props.setRatesConfig((prev) => ({ ...prev, [name]: parsed }));
  }
}
