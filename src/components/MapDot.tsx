import { useState } from "react";
import { ORIGIN_X, ORIGIN_Y } from "../GlobalVariables";

type Props = { x: number; y: number; type: number };

export default function MapDot(props: Props) {
  const [halfImgWidth, setHalfImgWidth] = useState(0);
  const [halfImgHeight, setHalfImgHeight] = useState(0);

  function updateImgDimensions(image: HTMLImageElement) {
    setHalfImgWidth(image.width / 2);
    setHalfImgHeight(image.height / 2);
  }

  const left = ORIGIN_X + props.x - Math.ceil(halfImgWidth);
  const top = ORIGIN_Y + props.y - Math.ceil(halfImgHeight);

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
