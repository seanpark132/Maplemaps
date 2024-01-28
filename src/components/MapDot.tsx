import { useState } from "react";

type Props = { x: number; y: number; type: number };

export default function MapDot(props: Props) {
  const [halfImgWidth, setHalfImgWidth] = useState(0);
  const [halfImgHeight, setHalfImgHeight] = useState(0);

  function updateImgDimensions(image: HTMLImageElement) {
    setHalfImgWidth(image.width / 2);
    setHalfImgHeight(image.height / 2);
  }

  const ORIGIN_X = 320;
  const ORIGIN_Y = 235;

  const left = ORIGIN_X + props.x - halfImgWidth;
  const top = ORIGIN_Y + props.y - halfImgHeight;

  return (
    <img
      className="absolute"
      src={`/dots/${props.type}.png`}
      onLoad={(e) => updateImgDimensions(e.target as HTMLImageElement)}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        visibility: `${halfImgWidth + halfImgHeight === 0 ? "hidden" : "visible"}`,
      }}
    />
  );
}
