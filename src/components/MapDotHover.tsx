import { TEMP_MOBS_DATA } from "../TEMP_mobsData";
import { Link } from "react-router-dom";
import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";

type Props = {
  mapNumber: number;
  mapsData: MapData[];
};

export default function MapDotHover(props: Props) {
  const mapData = props.mapsData.find((map) => map.map_id === props.mapNumber);
  if (!mapData) {
    return;
  }
  const mobIds = mapData.mobIds;
  const mobsData: (MobData | undefined)[] = mobIds.map((id) =>
    TEMP_MOBS_DATA.find((mob) => id === mob.mob_id),
  );

  return (
    <>
      <span className="map-dot-hover-container absolute bottom-1/2 left-1/2 z-20 w-fit min-w-20 rounded-md border border-white bg-black-transparent-75 p-3">
        <p className="text-nowrap text-white">{mapData.name}</p>
        {mobsData.map((mob: MobData | undefined) => {
          if (mob) {
            return (
              <p
                key={mob.mob_id}
                className="text-nowrap text-red-500"
              >{`${mob.raw.name} (Lv. ${mob.raw.meta.level})`}</p>
            );
          }
        })}
        <Link
          to={`/map/${props.mapNumber}`}
          className="text-nowrap text-white hover:text-green-400"
        >
          See map details
        </Link>
      </span>
    </>
  );
}
