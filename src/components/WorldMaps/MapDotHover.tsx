import { MapData, MobData } from "../../types/dataTypes";
import MapForceText from "./MapForceText";

type Props = {
  mapNumber: number;
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
};

export default function MapDotHover(props: Props) {
  const mapData = props.mapsData[props.mapNumber];
  if (!mapData) {
    return;
  }
  const mobIds = mapData.mobIds;
  const mobsData: MobData[] = mobIds.map((id) => props.mobsData[id]);

  return (
    <span className="map-dot-hover-container absolute bottom-1/2 left-1/2 z-20 w-fit min-w-20 rounded-md border border-white bg-black-transparent-75 p-3">
      <MapForceText
        arcaneForce={mapData.arcaneForce}
        sacredForce={mapData.sacredForce}
        starForce={mapData.starForce}
      />
      <p className="text-nowrap text-white">{mapData.name} </p>
      <hr className="border-gray-500" />
      {mobsData.map((mob: MobData) => {
        if (mob) {
          return (
            <p
              key={mob.mob_id}
              className="text-nowrap text-red-500"
            >{`${mob.name} (Lv. ${mob.level})`}</p>
          );
        }
      })}
    </span>
  );
}
