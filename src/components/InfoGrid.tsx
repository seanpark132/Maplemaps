type Props = {
  descriptions: string[];
  values: (number | string)[];
};

export default function InfoGrid(props: Props) {
  return (
    <div className="flex border">
      <ul>
        {props.descriptions.map((desc: string) => (
          <li className="border-2 border-b border-r p-3 font-semibold ">
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        {props.values.map((num: number | string) => (
          <li className="border-2 border-b border-l p-3 font-semibold">
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
