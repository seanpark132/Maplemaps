import { useState } from "react";
import {
  GOOGLE_CLOUD_IMAGE_URL,
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
} from "../GlobalVariables";
import MapDotHover from "./MapDotHover";
import { Map } from "../types/worldMapTypes";

type Props = {
  currentWorldMap: string;
  map: Map;
};

export default function MapDot(props: Props) {
  const [halfImgWidth, setHalfImgWidth] = useState(0);
  const [halfImgHeight, setHalfImgHeight] = useState(0);

  function updateImgDimensions(image: HTMLImageElement) {
    setHalfImgWidth(image.width / 2);
    setHalfImgHeight(image.height / 2);
  }

  let left = ORIGIN_X + props.map.x - Math.ceil(halfImgWidth);
  let top = ORIGIN_Y + props.map.y - Math.ceil(halfImgHeight);

  if (props.currentWorldMap in WORLD_MAP_OFFSETS) {
    left -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .x;
    top -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .y;
  }
  return (
    <span
      className="absolute z-10"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        visibility: `${halfImgWidth + halfImgHeight === 0 ? "hidden" : "visible"}`,
      }}
    >
      {props.map.mapNumbers.length === 1 && (
        <MapDotHover mapNumber={props.map.mapNumbers[0]} />
      )}
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/dots/${props.map.type}.png`}
        onLoad={(e) => updateImgDimensions(e.target as HTMLImageElement)}
        alt="World Map Dot"
      />
    </span>
  );
}
