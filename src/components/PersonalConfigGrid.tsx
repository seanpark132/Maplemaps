type Props = {
  totalBonusExpPercent: number;
  configInputs: Record<string, number>;
  configCheckboxes: Record<string, boolean>;
  selectedRuneValue: number;
  setConfigInputs: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setConfigCheckboxes: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  setSelectedRuneValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function PersonalConfigGrid(props: Props) {
  const RUNE_OPTIONS = [
    { exp: 0, name: "(0%) No Rune" },
    { exp: 20, name: "(20%) Base" },
    { exp: 40, name: "(40%) 200% Rune Exp Event" },
    { exp: 60, name: "(60%) Haste Event" },
    { exp: 34, name: "(34%) Base + Evan Link" },
    { exp: 68, name: "(68%) 200% Rune Exp Event + Evan Link" },
    { exp: 102, name: "(102%) Haste Event + Evan Link" },
  ];

  const MAX_INPUT_VALUES: Record<string, number> = {
    "Character Level": 300,
    "Meso Obtained %": 247,
    Burning: 100,
    "Legion Exp ": 10,
    "Zero Legion Block": 12,
    "Hyper Stat": 10,
    "Mercedes Link": 20,
    "Event Passive": 15,
    "Pendant of Spirit": 30,
  };

  return (
    <div className="flex w-fit rounded border">
      <ul>
        {Object.keys(props.configInputs)
          .slice(0, 3)
          .map((name: string) => (
            <li key={name} className="grid-padding border font-semibold">
              <label htmlFor={name}>{name}:</label>
            </li>
          ))}
        <li className="grid-padding border bg-green-300 font-semibold dark:bg-green-700">
          Total Bonus Exp %:
        </li>
        <li className="grid-padding border font-semibold ">
          <label htmlFor="Average Rune Exp">Average Rune Exp:</label>
        </li>
        {Object.keys(props.configInputs)
          .slice(3)
          .map((name: string) => (
            <li key={name} className="grid-padding border font-semibold">
              <label htmlFor={name}>{name}:</label>
            </li>
          ))}
        {Object.keys(props.configCheckboxes).map((name: string) => (
          <li key={name} className="grid-padding border font-semibold ">
            <label htmlFor={name}>{name}:</label>
          </li>
        ))}
      </ul>
      <ul>
        {Object.entries(props.configInputs)
          .slice(0, 3)
          .map(([name, value]: [string, number]) => (
            <li key={name}>
              <input
                className="grid-padding w-28 border"
                type="number"
                id={name}
                name={name}
                max={MAX_INPUT_VALUES[name]}
                value={value}
                onChange={(e) => handleInputChange(e)}
              />
            </li>
          ))}
        <li className="grid-padding border bg-green-300 dark:bg-green-700">
          {props.totalBonusExpPercent}
        </li>
        <li className="grid-padding w-28 border">
          <select
            id="Average Rune Exp"
            className="w-full"
            onChange={(e) => handleSelectChange(e)}
            value={props.selectedRuneValue}
          >
            {RUNE_OPTIONS.map((option) => (
              <option key={option.name} value={option.exp}>
                {option.name}
              </option>
            ))}
          </select>
        </li>
        {Object.entries(props.configInputs)
          .slice(3)
          .map(([name, value]: [string, number]) => (
            <li key={name}>
              <input
                className="grid-padding w-28 border"
                type="number"
                id={name}
                name={name}
                max={MAX_INPUT_VALUES[name]}
                value={isNaN(value) ? "" : value}
                onChange={(e) => handleInputChange(e)}
              />
            </li>
          ))}
        {Object.entries(props.configCheckboxes).map(
          ([name, value]: [string, boolean]) => (
            <li key={name} className="grid-padding border">
              <input
                type="checkbox"
                name={name}
                className="grid-padding border"
                checked={value}
                onChange={(e) => handleCheckboxChange(e)}
              />
            </li>
          ),
        )}
      </ul>
    </div>
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;
    if (parseInt(value) > MAX_INPUT_VALUES[name]) {
      value = String(MAX_INPUT_VALUES[name]);
    }
    props.setConfigInputs((prev) => {
      const newPrev = { ...prev, [name]: parseInt(value) };
      localStorage.setItem("configInputs", JSON.stringify(newPrev));
      return newPrev;
    });
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const valueAsNum = parseInt(e.target.value);
    localStorage.setItem("selectedRuneValue", JSON.stringify(valueAsNum));
    props.setSelectedRuneValue(valueAsNum);
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    const exclusions: Record<string, string> = {
      "2x Coupon": "3x Coupon",
      "3x Coupon": "2x Coupon",
      "Real Holy Symbol": "Decent Holy Symbol",
      "Decent Holy Symbol": "Real Holy Symbol",
    };

    props.setConfigCheckboxes((prev) => {
      const newPrev = { ...prev, [name]: checked };

      if (exclusions[name] && checked) {
        newPrev[exclusions[name]] = false;
      }

      localStorage.setItem("configCheckboxes", JSON.stringify(newPrev));
      return newPrev;
    });
  }
}
