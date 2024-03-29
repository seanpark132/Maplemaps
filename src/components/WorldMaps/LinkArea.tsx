import { useSearchParams } from "react-router-dom";
import {
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
  LINK_AREA_Z_INDEX,
  GOOGLE_CLOUD_IMAGE_URL,
  LINK_IMAGE_EDGE_CASES,
} from "../../utils/globalConstants";
import { Link, WorldMapData } from "../../types/dataTypes";

type Props = {
  worldMapsData: Record<string, WorldMapData>;
  link: Link;
  currentWorldMap: string;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export default function LinkArea(props: Props) {
  let left = ORIGIN_X - props.link.x;
  let top = ORIGIN_Y - props.link.y;
  if (props.currentWorldMap in WORLD_MAP_OFFSETS) {
    left -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .x;
    top -=
      WORLD_MAP_OFFSETS[props.currentWorldMap as keyof typeof WORLD_MAP_OFFSETS]
        .y;
  }

  const worldMapData = props.worldMapsData[props.link.linksTo];
  const parentWorld = worldMapData?.parentWorld;
  let linkImageName = `${props.link.linksTo}.webp`;
  if (
    props.link.linksTo in LINK_IMAGE_EDGE_CASES &&
    LINK_IMAGE_EDGE_CASES[props.link.linksTo].worldMap === props.currentWorldMap
  ) {
    if (LINK_IMAGE_EDGE_CASES[props.link.linksTo].imageName) {
      linkImageName = LINK_IMAGE_EDGE_CASES[props.link.linksTo].imageName!;
    } else {
      return;
    }
  }
  return (
    <span
      className="absolute opacity-0 hover:opacity-100"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        zIndex: `${LINK_AREA_Z_INDEX.includes(props.link.linksTo) && 9}`,
      }}
      onClick={handleClick}
    >
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/linkImages/${linkImageName}`}
        alt={`${props.link.linksTo}`}
      />
    </span>
  );

  function handleClick() {
    props.setSearchParams((prev) => {
      prev.set("worldMap", props.link.linksTo);
      prev.set("parentWorld", parentWorld ? parentWorld : "");
      return prev;
    });
  }
}
