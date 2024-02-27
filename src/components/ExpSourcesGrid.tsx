type Props = {
  totalBonusExpPercent: number;
  inputExpSources: Record<string, number>;
  checkboxExpSources: Record<string, boolean>;
  setInputExpSources: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  setCheckboxExpSources: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

export default function ExpSourcesGrid(props: Props) {
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
        {Object.keys(props.inputExpSources)
          .slice(0, 2)
          .map((desc: string) => (
            <li key={desc} className="border p-1 font-semibold lg:p-3">
              <label>{desc}:</label>
            </li>
          ))}

        <li className="border bg-green-300 p-1  font-semibold lg:p-3 dark:bg-green-700">
          Total Bonus Exp %:
        </li>
        {Object.keys(props.inputExpSources)
          .slice(2)
          .map((desc: string) => (
            <li key={desc} className="border p-1 font-semibold lg:p-3">
              <label>{desc}:</label>
            </li>
          ))}
        {Object.keys(props.checkboxExpSources).map((desc: string) => (
          <li key={desc} className="border p-1 font-semibold lg:p-3">
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        {Object.entries(props.inputExpSources)
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
        {Object.entries(props.inputExpSources)
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
        {Object.entries(props.checkboxExpSources).map(
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
    props.setInputExpSources((prev) => {
      const newPrev = { ...prev, [name]: parseInt(value) };
      localStorage.setItem("inputExpSources", JSON.stringify(newPrev));
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

    props.setCheckboxExpSources((prev) => {
      const newPrev = { ...prev, [name]: checked };

      if (exclusions[name] && checked) {
        newPrev[exclusions[name]] = false;
      }

      localStorage.setItem("checkboxExpSources", JSON.stringify(newPrev));
      return newPrev;
    });
  }
}
