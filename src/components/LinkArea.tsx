import { useSearchParams } from "react-router-dom";
import { ALL_WORLD_MAPS_DATA } from "../data/AllWorldMaps";

type Props = {
  worldMap: string;
  base64ImgCode: string;
  x: number;
  y: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function LinkArea(props: Props) {
  const ORIGIN_X = 320;
  const ORIGIN_Y = 235;

  const left = ORIGIN_X - props.x;
  const top = ORIGIN_Y - props.y;

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
