import { ConfigState } from "../../types/dataTypes";
import { useState, useEffect } from "react";

type Props = {
  label: string;
  exp: string;
  name: string;
  ratesConfig: ConfigState;
  setRatesConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
};

export default function InputCheckbox(props: Props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (props.ratesConfig.expAdditive[props.name] === props.exp) {
      setIsChecked(true);
    }
  }, []);

  return (
    <div className="my-1 flex items-center">
      <input
        type="checkbox"
        id={props.name}
        name={props.name}
        value={props.exp}
        checked={isChecked}
        onChange={(e) => handleCheckedChange(e)}
      />
      <label className="ml-4 w-72 py-1" htmlFor={props.name}>
        (+{props.exp}% exp) {props.label}
      </label>
    </div>
  );

  function handleCheckedChange(e: any) {
    setIsChecked((prev) => !prev);
    const { name, value, checked } = e.target;
    let newAdditive = "0";
    if (checked) {
      newAdditive = value;
    }

    props.setRatesConfig((prev) => ({
      ...prev,
      expAdditive: { ...prev.expAdditive, [name]: newAdditive },
    }));
  }
}
