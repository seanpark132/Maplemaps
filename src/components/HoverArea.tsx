import { useSearchParams } from "react-router-dom";

type Props = {
  currentArea: string | null;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  left: number;
  top: number;
  dotLeft: number;
  dotTop: number;
  name: string;
  parentArea: string;
};

export default function HoverArea(props: Props) {
  if (props.parentArea !== props.currentArea) {
    return;
  }

  return (
    <span
      className="absolute opacity-0 hover:opacity-100"
      style={{
        left: `${props.left}px`,
        top: `${props.top}px`,
      }}
      onClick={handleClick}
    >
      <img alt={props.name} src={`/hover_images/${props.name}.webp`} />
      <img
        className="absolute"
        style={{
          left: `${props.dotLeft}px`,
          top: `${props.dotTop}px`,
        }}
        alt="Area Dot"
        src="/arcane_river_area_dot.webp"
      />
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      prev.set("currentArea", props.name);
      return prev;
    });
  }
}
