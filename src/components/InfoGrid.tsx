type Props = {
  descriptions: string[];
  values: (number | string)[];
};

export default function InfoGrid(props: Props) {
  return (
    <div className="flex border">
      <ul>
        {props.descriptions.map((desc: string) => (
          <li
            key={desc}
            className="border-2 border-b border-r p-1 font-semibold lg:p-3"
          >
            {desc}:
          </li>
        ))}
      </ul>
      <ul>
        {props.values.map((num: number | string, index: number) => (
          <li
            key={`${index}:${num}`}
            className="border-2 border-b border-l p-1 font-semibold lg:p-3"
          >
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
