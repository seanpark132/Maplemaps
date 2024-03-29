import { useState } from "react";
import {
  GOOGLE_CLOUD_IMAGE_URL,
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
  MAP_DOT_NUMBERS,
} from "../../utils/globalConstants";
import MapDotHover from "./MapDotHover";
import { Map, MapData, MobData } from "../../types/dataTypes";
import { Link } from "react-router-dom";

type Props = {
  currentWorldMap: string;
  map: Map;
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
};

export default function MapDot(props: Props) {
  if (!MAP_DOT_NUMBERS.includes(props.map.type)) {
    return;
  }

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
      className="map-dot-container absolute p-1"
      style={{
        left: `${left - 4}px`,
        top: `${top - 4}px`,
      }}
    >
      {props.map.mapNumbers.length > 0 && !props.map.noTooltip ? (
        <>
          <Link to={`/map/${props.map.mapNumbers[0]}`}>
            <img
              className="z-10"
              src={`${GOOGLE_CLOUD_IMAGE_URL}/dots/${props.map.type}.png`}
              onLoad={(e) => updateImgDimensions(e.target as HTMLImageElement)}
              alt="World Map Dot"
            />
          </Link>
          <MapDotHover
            key={props.map.mapNumbers[0]}
            mapNumber={props.map.mapNumbers[0]}
            mapsData={props.mapsData}
            mobsData={props.mobsData}
          />
        </>
      ) : (
        <img
          className="z-10"
          src={`${GOOGLE_CLOUD_IMAGE_URL}/dots/${props.map.type}.png`}
          onLoad={(e) => updateImgDimensions(e.target as HTMLImageElement)}
          alt="World Map Dot"
        />
      )}
    </span>
  );
}
