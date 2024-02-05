import { GOOGLE_CLOUD_IMAGE_URL } from "../GlobalVariables";
import { MobData } from "../types/mobTypes";

type Props = {
  mobData: MobData | undefined;
};

export default function MobInfo(props: Props) {
  let maxHP: any = props.mobData?.raw.meta.maxHP;
  if (typeof maxHP !== "number") {
    maxHP = maxHP?.$numberLong;
  }

  let maxHPRounded = maxHP;
  let maxHPSuffix = "";
  if (maxHP / 1000000000 > 1) {
    maxHPRounded = Math.round((maxHP * 100) / 1000000000) / 100;
    maxHPSuffix = "B";
  } else if (maxHP / 1000000 > 1) {
    maxHPRounded = Math.round((maxHP * 100) / 1000000) / 100;
    maxHPSuffix = "M";
  } else if (maxHP / 1000 > 1) {
    maxHPRounded = Math.round((maxHP * 100) / 1000) / 100;
    maxHPSuffix = "K";
  }

  return (
    <div className="flex w-full border-b-2 p-6">
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
            Exp: {props.mobData?.raw.meta.exp}
          </li>
          <li className="px-6 py-2 font-semibold">
            HP: {`${maxHPRounded}${maxHPSuffix}`} ({maxHP})
          </li>
        </ul>
      </div>
    </div>
  );
}
