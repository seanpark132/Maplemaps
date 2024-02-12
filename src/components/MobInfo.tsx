import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";
import { MaxHP, MobData } from "../types/mobTypes";
import InfoGrid from "./InfoGrid";

type Props = {
  mobData: MobData;
};

export default function MobInfo(props: Props) {
  let maxHP: number | MaxHP | undefined = props.mobData?.raw.meta.maxHP;
  if (typeof maxHP !== "number") {
    maxHP = Number(maxHP?.$numberLong);
  }

  const descriptions = ["Level", "Exp", "HP"];
  const values = [
    props.mobData.raw.meta.level,
    props.mobData.raw.meta.exp!.toLocaleString("US"),
    `${` ${maxHP.toLocaleString("US")}`}`,
  ];

  return (
    <div className="flex items-center p-4 lg:p-8">
      <div className="flex w-20 flex-col items-center justify-center text-center md:w-40">
        <img
          src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/mobs/${props.mobData.mob_id}.png`}
          className="w-20 md:w-40"
        />
        <p className="mt-4 font-semibold">{props.mobData.raw.name}</p>
      </div>
      <div className="flex h-full flex-col justify-center pl-3 lg:pl-6">
        <InfoGrid descriptions={descriptions} values={values} />
      </div>
    </div>
  );
}
