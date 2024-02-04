import { TEMP_MOBS_DATA } from "../TEMP_mobsData";

type Props = {
  mapNumber: number;
  mapsData: any[];
};

export default function MapDotHover(props: Props) {
  const mapData = props.mapsData.find((map) => map.map_id === props.mapNumber);
  const uniqueMobIds = [
    ...new Set(mapData?.raw.mobs.map((mob: any) => mob.id)),
  ];
  const uniqueMobData = uniqueMobIds.map((mobId) =>
    TEMP_MOBS_DATA.find((mob) => mobId === mob.mob_id),
  );

  return (
    <>
      {mapData && (
        <span className="map-dot-hover-container bg-black-transparent-75 absolute bottom-1/2 left-1/2 z-20 w-fit min-w-16 rounded-md border border-white p-2">
          <p className="text-nowrap text-xs">{mapData.raw.name}</p>
          {uniqueMobData.map((mob: any) => (
            <p className="text-nowrap text-xs text-red-500">{`${mob.raw.name} (${mob.raw.meta.level})`}</p>
          ))}
        </span>
      )}
    </>
  );
}
