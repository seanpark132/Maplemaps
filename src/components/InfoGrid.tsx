type Props = {
  descriptions: string[];
  values: (number | string)[];
};

export default function InfoGrid(props: Props) {
  return (
    <div className="flex w-fit rounded border">
      <ul>
        {props.descriptions.map((desc: string) => (
          <li key={desc} className="border p-1 font-semibold lg:p-3">
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        {props.values.map((num: number | string, index: number) => (
          <li
            key={`${index}:${num}`}
            className="border p-1 font-semibold lg:p-3"
          >
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
