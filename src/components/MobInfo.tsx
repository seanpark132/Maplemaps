import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";
import { MobData } from "../types/mobTypes";

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

  return (
    <div className="flex w-full border-b-2 p-8">
      <div className="text-center">
        <img
          src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/mobs/${props.mobData?.mob_id}.png`}
        />
        <p className="mt-4 font-semibold">{props.mobData?.raw.name}</p>
      </div>
      <div>
        <ul>
          <li className="px-6 py-2 font-semibold">
            Level: {props.mobData?.raw.meta.level}
          </li>
          <li className="px-6 py-2 font-semibold">
            Exp: {props.mobData?.raw.meta.exp?.toLocaleString("en-US")}
          </li>
          <li className="px-6 py-2 font-semibold">
            HP: {`${maxHPRounded}${maxHPSuffix}`} (
            {maxHP.toLocaleString("en-US")})
          </li>
        </ul>
      </div>
    </div>
  );
}
