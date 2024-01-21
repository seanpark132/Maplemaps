import { useSearchParams } from "react-router-dom";

type Props = {
  currentArea: string | null;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  left: number;
  top: number;
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
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      prev.set("currentArea", props.name);
      return prev;
    });
  }
}
