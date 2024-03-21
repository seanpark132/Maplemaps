type Props = {
  descriptions: string[];
  values: (number | string)[];
};

export default function InfoGrid(props: Props) {
  return (
    <div className="flex w-fit rounded border">
      <ul>
        {props.descriptions.map((desc: string) => (
          <li key={desc} className="grid-item font-semibold">
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        {props.values.map((num: number | string, index: number) => (
          <li key={`${index}:${num}`} className="grid-item min-w-28">
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
