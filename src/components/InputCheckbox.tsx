type Props = {
  label: string;
  exp: number;
  name: string;
  handlerFnc: any;
};

export default function InputCheckbox(props: Props) {
  return (
    <div className="my-1 flex items-center">
      <input
        type="checkbox"
        id={props.name}
        name={props.name}
        value={props.exp}
        onChange={(e) => props.handlerFnc(e)}
      />
      <label className="ml-4 w-72 py-1" htmlFor={props.name}>
        (+{props.exp}% exp) {props.label}
      </label>
    </div>
  );
}
