import { TEMP_MOBS_DATA } from "../TEMP_mobsData";
import { MobData } from "../types/mobTypes";
import MobInfo from "../components/MobInfo";
import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";
import { MapData } from "../types/mapTypes";
import MobSpawnInfo from "../components/MobSpawnInfo";

type Props = {
  mapData: MapData;
};

export default function MapInfo(props: Props) {
  const mobIds = props.mapData.mobIds;
  const mobsData: (MobData | undefined)[] = mobIds.map((id) =>
    TEMP_MOBS_DATA.find((mob) => id === mob.mob_id),
  );

  return (
    <main className="flex w-full flex-col p-8">
      <h2 className="mb-4">
        {props.mapData.streetName} : {props.mapData.name}
      </h2>
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/maps/${props.mapData.map_id}.png`}
        className="mb-6 max-h-screen rounded-lg border-2 object-contain"
      />
      {mobsData && mobsData.length > 0 && (
        <section className="flex w-full">
          <div className="flex w-fit flex-col justify-center rounded-lg border-2">
            {mobsData.map((mob) => (
              <MobInfo key={mob?.mob_id} mobData={mob} />
            ))}
          </div>

          <MobSpawnInfo mapData={props.mapData} mobsData={mobsData} />
        </section>
      )}
    </main>
  );
}
