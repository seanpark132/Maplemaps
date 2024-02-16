import { MobData } from "../types/mobTypes";
import MobInfo from "../components/MobInfo";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/GlobalVariables";
import { MapData } from "../types/mapTypes";
import { useState } from "react";
import MobSpawnInfo from "../components/MobSpawnInfo";
import Loading from "./Loading";
import { useFetchSingleMapAndMobData } from "../hooks/useFetchSingleMapAndMobData";

type Props = {
  id: number;
  mapIds: number[];
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
};

export default function MapInfo(props: Props) {
  const [mapData, setMapData] = useState<MapData | undefined>();
  const [mobData, setMobData] = useState<(MobData | undefined)[]>([]);

  useFetchSingleMapAndMobData(
    props.id,
    props.mapsData,
    props.mobsData,
    setMapData,
    setMobData,
  );

  if (!mapData || !mobData || !props.mapIds) {
    return <Loading />;
  }

  return (
    <main className="flex w-full flex-col lg:p-6">
      <h2 className="my-6">
        {mapData.streetName} : {mapData.name}
      </h2>
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/maps/${mapData.map_id}.png`}
        className="image-max-height mb-8 rounded-lg border-2 object-contain"
      />
      {mobData && mobData.length > 0 && (
        <section className="flex flex-col md:flex-row">
          <div className="mb-8 flex w-fit flex-col justify-center rounded-lg border-2 md:mb-0">
            {mobData.map((mob: MobData | undefined) => {
              if (mob) {
                return <MobInfo key={mob.mob_id} mobData={mob} />;
              }
            })}
          </div>
          <MobSpawnInfo mapData={mapData} mobsData={mobData} />
        </section>
      )}
    </main>
  );
}
