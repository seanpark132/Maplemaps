import { MobData } from "../types/mobTypes";

type Props = {
  mobData: MobData | undefined;
};

const TEMP_MOB_NAME = "/mob-8645130.png";

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
    <div className="flex">
      <div>
        <img src={TEMP_MOB_NAME} />
        <p className="mt-4">{props.mobData?.raw.name}</p>
      </div>
      <div className="pl-12">
        <ul>
          <li>Level: {props.mobData?.raw.meta.level}</li>
          <li>Exp: {props.mobData?.raw.meta.exp}</li>
          <li>
            HP: {`${maxHPRounded}${maxHPSuffix}`} ({maxHP})
          </li>
        </ul>
      </div>
    </div>
  );
}
