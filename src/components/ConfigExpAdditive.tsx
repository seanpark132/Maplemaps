import InputSelect from "./InputSelect";
import InputCheckbox from "./InputCheckbox";
import InputNumber from "./InputNumber";
import {
  ADDITIVE_CHECKBOXES,
  ADDITIVE_SELECTS,
  ADDITIVE_NUMBERS,
} from "../utils/ratesConstants";
import { ConfigState } from "../types/dataTypes";

type Props = {
  ratesConfig: ConfigState;
  setRatesConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
};

export default function ConfigExpAdditive(props: Props) {
  return (
    <section className="flex flex-wrap">
      <div className="flex flex-col sm:mr-16">
        <h2 className="underline">Additive Exp Bonuses </h2>
        {ADDITIVE_CHECKBOXES.map((obj) => (
          <InputCheckbox
            key={obj.name}
            label={obj.label}
            exp={obj.exp}
            name={obj.name}
            ratesConfig={props.ratesConfig}
            setRatesConfig={props.setRatesConfig}
          />
        ))}
        {ADDITIVE_SELECTS.map((obj) => (
          <InputSelect
            key={obj.name}
            label={obj.label}
            name={obj.name}
            value={props.ratesConfig.expAdditive[obj.name]}
            options={obj.options}
            handlerFnc={handleSelectChange}
          />
        ))}
      </div>
      <div className="flex flex-col sm:mt-10">
        {ADDITIVE_NUMBERS.map((obj) => (
          <InputNumber
            key={obj.name}
            label={obj.label}
            name={obj.name}
            max={obj.max}
            value={props.ratesConfig.expAdditive[obj.name]}
            handlerFnc={handleNumberChange}
          />
        ))}
      </div>
    </section>
  );

  function handleSelectChange(e: any) {
    const { name, value } = e.target;

    props.setRatesConfig((prev) => ({
      ...prev,
      expAdditive: { ...prev.expAdditive, [name]: value },
    }));
  }

  function handleNumberChange(e: any) {
    const { name, value, max } = e.target;

    let valAsNum: number | string = Number(value);
    if (isNaN(valAsNum)) {
      valAsNum = "";
    } else if (max && valAsNum > max) {
      valAsNum = max;
    }

    props.setRatesConfig((prev) => ({
      ...prev,
      expAdditive: { ...prev.expAdditive, [name]: String(valAsNum) },
    }));
  }
}
