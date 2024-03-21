import { GOOGLE_CLOUD_IMAGE_URL } from "../../utils/globalConstants";
import { MobData } from "../../types/dataTypes";
import InfoGrid from "./InfoGrid";

type Props = {
  mobData: MobData;
};

export default function MobInfo(props: Props) {
  let maxHP: number | { $numberLong: string } = props.mobData.maxHP;
  if (typeof maxHP !== "number") {
    maxHP = Number(maxHP.$numberLong);
  }

  const descriptions = ["Level", "Exp", "HP"];
  const values = [
    props.mobData.level,
    props.mobData.exp.toLocaleString("US"),
    maxHP.toLocaleString("US"),
  ];

  return (
    <div className="flex items-center py-4 lg:py-6">
      <div className="mr-4 flex max-w-20 flex-1 flex-col items-center justify-center text-center md:mr-6 md:max-w-36">
        <img
          src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/mobs/${props.mobData.mob_id}.png`}
          className="max-w-20 md:max-w-36"
        />
        <p className="mt-4 font-semibold">{props.mobData.name}</p>
      </div>
      <div className="ml-auto">
        <InfoGrid descriptions={descriptions} values={values} />
      </div>
    </div>
  );
}
