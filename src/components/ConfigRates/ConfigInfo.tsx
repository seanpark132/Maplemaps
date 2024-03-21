import InputNumber from "./InputNumber";
import { ConfigState } from "../../types/dataTypes";

type Props = {
  totalMulti: number;
  level: string;
  mesoObtained: string;
  ratesConfig: ConfigState;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  setMesoObtained: React.Dispatch<React.SetStateAction<string>>;
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
          value={props.level}
          handlerFnc={(e: any) => handleNumberChange(e, "level")}
        />
        <InputNumber
          label="Meso Obtained %"
          name="mesoObtained"
          max={3000}
          value={props.mesoObtained}
          handlerFnc={(e: any) => handleNumberChange(e, "mesoObtained")}
        />
      </div>
      <div className="flex flex-col items-center rounded-xl border p-4">
        <h3>Total Exp Multiplier</h3>
        <p className="pt-2 text-6xl font-bold text-green-700 dark:text-green-400 ">
          {props.totalMulti}
        </p>
      </div>
    </section>
  );

  function handleNumberChange(e: any, name: string) {
    const { value, max } = e.target;
    let valAsNum: number | string = Number(value);
    if (isNaN(valAsNum)) {
      valAsNum = "";
    } else if (max && valAsNum > max) {
      valAsNum = max;
    }

    const valAsString = String(valAsNum);

    localStorage.setItem(name, valAsString);

    if (name === "level") {
      props.setLevel(valAsString);
    } else if (name === "mesoObtained") {
      props.setMesoObtained(valAsString);
    }
  }
}
