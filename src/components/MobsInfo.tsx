import MobInfo from "./MobInfo";
import { MobData } from "../types/dataTypes";

type Props = {
  mobsData: MobData[];
};

export default function MobsInfo(props: Props) {
  return (
    <article className="mb-8 h-fit w-fit rounded-lg border-2 p-4 md:p-6">
      <h2>Monsters:</h2>
      <div className="flex flex-col justify-center">
        {props.mobsData.map((mob: MobData) => {
          if (mob) {
            return <MobInfo key={mob.mob_id} mobData={mob} />;
          }
        })}
      </div>
    </article>
  );
}
