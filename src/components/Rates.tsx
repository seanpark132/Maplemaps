import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import RatesBase from "./RatesBase";
import RatesPersonal from "./RatesPersonal";

type Props = {
  mapData: MapData;
  mobsData: (MobData | undefined)[];
};

export default function Rates(props: Props) {
  let averageExp = props.mobsData[0]!.raw.meta.exp;
  let averageLevel = props.mobsData[0]!.raw.meta.exp;

  if (props.mobsData.length > 1) {
    const numMobs = props.mobsData.length;
    const expSum = props.mobsData
      .map((mob) => mob?.raw.meta.exp)
      .reduce((acc, item) => acc! + (item ?? 0), 0);
    const levelSum = props.mobsData
      .map((mob) => mob?.raw.meta.level)
      .reduce((acc, item) => acc! + (item ?? 0), 0);
    if (expSum && levelSum) {
      averageExp = expSum / numMobs;
      averageLevel = levelSum / numMobs;
    }
  }

  const hourlyMobs = props.mapData.capacityPerGen * 480;
  const expRate = hourlyMobs * (averageExp ? averageExp : 0);
  const mesoRate = hourlyMobs * 7.5 * (averageLevel ? averageLevel : 0);

  return (
    <>
      <RatesBase
        mapData={props.mapData}
        mobsData={props.mobsData}
        hourlyMobs={hourlyMobs}
        expRate={expRate}
        mesoRate={mesoRate}
      />
      <RatesPersonal />
    </>
  );
}
