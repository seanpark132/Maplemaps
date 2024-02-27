type Props = {
  totalBonusExpPercent: number;
  configInputs: Record<string, number>;
  configCheckboxes: Record<string, boolean>;
  setConfigInputs: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setConfigCheckboxes: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

export default function PersonalConfigGrid(props: Props) {
  const MAX_INPUT_VALUES: Record<string, number> = {
    "Character Level": 300,
    "Meso Obtained %": 177,
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
          .slice(0, 2)
          .map((desc: string) => (
            <li key={desc} className="border p-1 font-semibold lg:p-3">
              <label>{desc}:</label>
            </li>
          ))}
        <li className="border bg-green-300 p-1  font-semibold lg:p-3 dark:bg-green-700">
          Total Bonus Exp %:
        </li>
        {Object.keys(props.configInputs)
          .slice(2)
          .map((desc: string) => (
            <li key={desc} className="border p-1 font-semibold lg:p-3">
              <label>{desc}:</label>
            </li>
          ))}
        {Object.keys(props.configCheckboxes).map((desc: string) => (
          <li key={desc} className="border p-1 font-semibold lg:p-3">
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        {Object.entries(props.configInputs)
          .slice(0, 2)
          .map(([name, value]: [string, number]) => (
            <li key={name}>
              <input
                className="w-16 border p-1 font-semibold lg:w-28 lg:p-3"
                type="number"
                name={name}
                max={MAX_INPUT_VALUES[name]}
                value={value}
                onChange={(e) => handleInputChange(e)}
              />
            </li>
          ))}
        <li className="border bg-green-300 p-1 font-semibold lg:p-3 dark:bg-green-700">
          {props.totalBonusExpPercent}
        </li>
        {Object.entries(props.configInputs)
          .slice(2)
          .map(([name, value]: [string, number]) => (
            <li key={name}>
              <input
                className="w-16 border p-1 font-semibold lg:w-28 lg:p-3"
                type="number"
                name={name}
                max={MAX_INPUT_VALUES[name]}
                value={value}
                onChange={(e) => handleInputChange(e)}
              />
            </li>
          ))}
        {Object.entries(props.configCheckboxes).map(
          ([name, value]: [string, boolean]) => (
            <li key={name} className="border p-1 font-semibold lg:p-3">
              <input
                type="checkbox"
                name={name}
                className="border p-1 font-semibold lg:p-3"
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
