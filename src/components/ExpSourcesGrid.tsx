type Props = {
  totalBonusExpPercent: number;
  inputExpSources: Record<string, number>;
  boolExpSources: Record<string, boolean>;
  setInputExpSources: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  setBoolExpSources: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

export default function ExpSourcesGrid(props: Props) {
  const MAX_INPUT_VALUES: Record<string, number> = {
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
        <li className="border bg-green-300 p-1  font-semibold lg:p-3 dark:bg-green-700">
          Total Bonus Exp %:
        </li>
        {Object.keys(props.inputExpSources).map((desc: string) => (
          <li key={desc} className="border p-1 font-semibold lg:p-3">
            <label>{desc}:</label>
          </li>
        ))}
        {Object.keys(props.boolExpSources).map((desc: string) => (
          <li key={desc} className="border p-1 font-semibold lg:p-3">
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        <li className="border bg-green-300 p-1 font-semibold lg:p-3 dark:bg-green-700">
          {props.totalBonusExpPercent}
        </li>
        {Object.entries(props.inputExpSources).map(
          ([name, value]: [string, number]) => (
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
          ),
        )}
        {Object.entries(props.boolExpSources).map(
          ([name, value]: [string, boolean]) => (
            <li key={name} className="border p-1 font-semibold lg:p-3">
              <input
                type="checkbox"
                name={name}
                className="border p-1 font-semibold lg:p-3"
                checked={value}
                onChange={(e) => handleBoolChange(e)}
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
    props.setInputExpSources((prev) => ({ ...prev, [name]: parseInt(value) }));
  }

  function handleBoolChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    if (name === "2x Coupon" && props.boolExpSources["3x Coupon"]) {
      props.setBoolExpSources((prev) => ({ ...prev, "3x Coupon": false }));
    } else if (name === "3x Coupon" && props.boolExpSources["2x Coupon"]) {
      props.setBoolExpSources((prev) => ({ ...prev, "2x Coupon": false }));
    } else if (
      name === "Real Holy Symbol" &&
      props.boolExpSources["Decent Holy Symbol"]
    ) {
      props.setBoolExpSources((prev) => ({
        ...prev,
        "Decent Holy Symbol": false,
      }));
    } else if (
      name === "Decent Holy Symbol" &&
      props.boolExpSources["Real Holy Symbol"]
    ) {
      props.setBoolExpSources((prev) => ({
        ...prev,
        "Real Holy Symbol": false,
      }));
    }
    props.setBoolExpSources((prev) => ({ ...prev, [name]: checked }));
  }
}
