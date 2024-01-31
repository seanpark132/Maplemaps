import { useSearchParams } from "react-router-dom";
import {
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
  LINK_AREA_Z_INDEX,
} from "../GlobalVariables";

type Props = {
  allWorldMapsData: any[];
  currentWorldMap: string;
  worldMap: string;
  base64ImgCode: string;
  x: number;
  y: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function LinkArea(props: Props) {
  let left = ORIGIN_X - props.x;
  let top = ORIGIN_Y - props.y;
  if (props.currentWorldMap in WORLD_MAP_OFFSETS) {
    left -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .x;
    top -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .y;
  }

  const worldMapData = props.allWorldMapsData.find(
    (worldMapData) => worldMapData.raw.worldMapName === props.worldMap,
  );
  const parentWorld = worldMapData?.raw.parentWorld;

  return (
    <span
      className="absolute opacity-0 hover:opacity-100"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        zIndex: `${LINK_AREA_Z_INDEX.includes(props.worldMap) && 9}`,
      }}
      onClick={handleClick}
    >
      <img
        src={`data:image/png;base64,${props.base64ImgCode} `}
        alt={`${props.worldMap}`}
      />
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      prev.set("worldMap", props.worldMap);
      prev.set("parentWorld", parentWorld ? parentWorld : "");
      return prev;
    });
  }
}
