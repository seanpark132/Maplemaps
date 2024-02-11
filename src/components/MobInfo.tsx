import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";
import { MobData } from "../types/mobTypes";
import InfoGrid from "./InfoGrid";

type Props = {
  mobData: MobData | undefined;
};

export default function MobInfo(props: Props) {
  let maxHP: any = props.mobData?.raw.meta.maxHP;
  if (typeof maxHP !== "number") {
    maxHP = Number(maxHP?.$numberLong);
  }

  let maxHPRounded = maxHP;
  let maxHPSuffix = "";
  if (maxHP / 1000000000 > 1) {
    maxHPRounded = Math.round((maxHP * 10) / 1000000000) / 10;
    maxHPSuffix = "B";
  } else if (maxHP / 1000000 > 1) {
    maxHPRounded = Math.round((maxHP * 10) / 1000000) / 10;
    maxHPSuffix = "M";
  } else if (maxHP / 1000 > 1) {
    maxHPRounded = Math.round((maxHP * 10) / 1000) / 10;
    maxHPSuffix = "K";
  }

  const descriptions = ["Level", "Exp", "HP"];
  const values = [
    props.mobData!.raw.meta.level,
    props.mobData!.raw.meta.exp!.toLocaleString("US"),
    `${maxHPRounded}${maxHPSuffix} ${` (${maxHP.toLocaleString("US")})`}`,
  ];

  return (
    <div className="flex w-full p-8">
      <div className="text-center">
        <img
          src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/mobs/${props.mobData?.mob_id}.png`}
          width={200}
        />
        <p className="mt-4 font-semibold">{props.mobData?.raw.name}</p>
      </div>
      <div className="flex h-full flex-col justify-center px-8">
        <InfoGrid descriptions={descriptions} values={values} />
      </div>
    </div>
  );
}
