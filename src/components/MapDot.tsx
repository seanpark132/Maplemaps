import { useState } from "react";
import {
  GOOGLE_CLOUD_IMAGE_URL,
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
} from "../GlobalVariables";

type Props = { currentWorldMap: string; x: number; y: number; type: number };

export default function MapDot(props: Props) {
  const [halfImgWidth, setHalfImgWidth] = useState(0);
  const [halfImgHeight, setHalfImgHeight] = useState(0);

  function updateImgDimensions(image: HTMLImageElement) {
    setHalfImgWidth(image.width / 2);
    setHalfImgHeight(image.height / 2);
  }

  let left = ORIGIN_X + props.x - Math.ceil(halfImgWidth);
  let top = ORIGIN_Y + props.y - Math.ceil(halfImgHeight);

  if (props.currentWorldMap in WORLD_MAP_OFFSETS) {
    left -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .x;
    top -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .y;
  }
  return (
    <img
      className="absolute z-10"
      src={`${GOOGLE_CLOUD_IMAGE_URL}/dots/${props.type}.png`}
      onLoad={(e) => updateImgDimensions(e.target as HTMLImageElement)}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        visibility: `${halfImgWidth + halfImgHeight === 0 ? "hidden" : "visible"}`,
      }}
      alt="World Map Dot"
    />
  );
}
