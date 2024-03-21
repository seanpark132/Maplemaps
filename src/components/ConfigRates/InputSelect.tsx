type Props = {
  label: string;
  name: string;
  value: string;
  options: any[];
  handlerFnc: any;
  isMulti?: boolean;
};

export default function InputSelect(props: Props) {
  return (
    <>
      <label className="py-1" htmlFor={props.name}>
        {props.label}
      </label>
      <select
        className="mb-4 w-60 overflow-ellipsis rounded border px-2 py-1"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.handlerFnc(e)}
      >
        <option value={props.isMulti ? 1 : 0}>None</option>
        {props.options.map((option) => (
          <option key={option.exp} value={option.exp}>
            {props.isMulti
              ? `(${option.exp}x) ${option.label}`
              : `+${option.exp}% ${option.label}`}
          </option>
        ))}
      </select>
    </>
  );
}
