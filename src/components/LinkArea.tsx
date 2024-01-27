import { useSearchParams } from "react-router-dom";

type Props = {
  worldMap: string;
  base64ImgCode: string;
  x: number;
  y: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function LinkArea(props: Props) {
  return (
    <span
      className="absolute opacity-0 hover:opacity-100"
      onClick={handleClick}
    >
      <img src={`data:image/png;base64,${props.base64ImgCode} `} />
      <img className="absolute" alt="Area Dot" src="/grandis_area_dot.webp" />
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      prev.set("worldMap", props.worldMap);

      return prev;
    });
  }
}
