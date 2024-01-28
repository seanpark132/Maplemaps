import { useSearchParams } from "react-router-dom";
import { ALL_WORLD_MAPS_DATA } from "../data/AllWorldMaps";
import { ORIGIN_X, ORIGIN_Y, WORLD_MAP_OFFSETS } from "../GlobalVariables";

type Props = {
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

  const worldMapData = ALL_WORLD_MAPS_DATA.find(
    (worldMapData) => worldMapData.raw.worldMapName === props.worldMap,
  );
  const parentWorld = worldMapData?.raw.parentWorld;

  return (
    <span
      className="absolute opacity-0 hover:opacity-100"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      onClick={handleClick}
    >
      <img src={`data:image/png;base64,${props.base64ImgCode} `} />
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
