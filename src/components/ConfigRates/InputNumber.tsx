type Props = {
  label: string;
  name: string;
  max?: number;
  value: string;
  handlerFnc: any;
};

export default function InputNumber(props: Props) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className="mb-4 mt-1 w-24 rounded border px-2 py-1"
        type="number"
        id={props.name}
        name={props.name}
        max={props.max}
        value={props.value}
        onChange={(e) => props.handlerFnc(e)}
      />
    </>
  );
}
