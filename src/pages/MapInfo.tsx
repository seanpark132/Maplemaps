import { TEMP_MOBS_DATA } from "../TEMP_mobsData";
import { MobData } from "../types/mobTypes";
import MobInfo from "../components/MobInfo";
import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";

type Props = {
  mapData: any;
};

export default function MapInfo(props: Props) {
  const uniqueMobIds = [
    ...new Set(props.mapData.raw.mobs.map((mob: any) => mob.id)),
  ];
  const uniqueMobData: (MobData | undefined)[] = uniqueMobIds.map((mobId) =>
    TEMP_MOBS_DATA.find((mob) => mobId === mob.mob_id),
  );

  return (
    <main className="flex w-full flex-col p-8">
      <h2 className="mb-4">Map: {props.mapData.raw.name}</h2>
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/maps/${props.mapData?.map_id}.png`}
        className="mb-6 max-h-screen rounded-lg border-2 object-contain"
      />
      <div className="w-full">
        <section className="flex w-fit flex-col rounded-lg border-2 border-b-0">
          {uniqueMobData &&
            uniqueMobData.map((mob: MobData | undefined) => (
              <MobInfo key={mob?.mob_id} mobData={mob} />
            ))}
        </section>
      </div>
    </main>
  );
}
