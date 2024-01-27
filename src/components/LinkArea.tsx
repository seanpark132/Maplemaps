import { useSearchParams } from "react-router-dom";

type Props = {
  worldMap: string;
  parentWorld: string;
  base64ImgCode: string;
  x: number;
  y: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function LinkArea(props: Props) {
  const ORIGIN_X = 320;
  const ORIGIN_Y = 235;

  const left = ORIGIN_X - props.x;
  const top = ORIGIN_Y - props.y;

  return (
    <span
      className="absolute opacity-0 hover:opacity-100"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      onClick={handleClick}
    >
      <img src={`data:image/png;base64,${props.base64ImgCode} `} />
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      prev.set("worldMap", props.worldMap);
      prev.set("parentWorld", props.parentWorld);
      return prev;
    });
  }
}
