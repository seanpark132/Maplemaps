import { useSearchParams } from "react-router-dom";

type Props = {
  area: string | null;
  region: string | null;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  left: number;
  top: number;
  dotLeft: number;
  dotTop: number;
  name: string;
  parentArea: string | undefined;
};

export default function HoverArea(props: Props) {
  if (!props.area && props.parentArea) {
    return;
  }

  if (props.area && props.area !== props.parentArea) {
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
          visibility: `${props.dotLeft + props.dotTop === 0 ? "hidden" : "visible"}`,
          left: `${props.dotLeft}px`,
          top: `${props.dotTop}px`,
        }}
        alt="Area Dot"
        src={
          props.region === "arcane_river"
            ? "/arcane_river_area_dot.webp"
            : "/grandis_area_dot.webp"
        }
      />
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      if (props.name[props.name.length - 1] === "2") {
        const nameWithoutNumber = props.name.slice(0, -1);
        prev.set("area", nameWithoutNumber);
      } else {
        prev.set("area", props.name);
      }

      return prev;
    });
  }
}
