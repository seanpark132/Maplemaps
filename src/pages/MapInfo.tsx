import { TEMP_MOBS_DATA } from "../TEMP_mobsData";
import { MobData } from "../types/mobTypes";
import MobInfo from "../components/MobInfo";

type Props = {
  mapData: any;
};

const TEMP_MAP_IMAGE = "/410000870.png";

export default function MapInfo(props: Props) {
  const uniqueMobIds = [
    ...new Set(props.mapData.raw.mobs.map((mob: any) => mob.id)),
  ];
  const uniqueMobData: (MobData | undefined)[] = uniqueMobIds.map((mobId) =>
    TEMP_MOBS_DATA.find((mob) => mobId === mob.mob_id),
  );

  return (
    <main className="mt-8">
      <h2 className="mb-4">Map: {props.mapData.raw.name}</h2>
      <img
        src={TEMP_MAP_IMAGE}
        width={1800}
        className="mb-6 rounded-lg border-2"
      />
      <section className="flex flex-col p-4">
        {uniqueMobData &&
          uniqueMobData.map((mob: MobData | undefined) => (
            <MobInfo key={mob?.mob_id} mobData={mob} />
          ))}
      </section>
    </main>
  );
}
