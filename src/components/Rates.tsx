import { MapData, MobData } from "../types/dataTypes";
import RatesBase from "./RatesBase";
import RatesPersonal from "./RatesPersonal";

type Props = {
  mapData: MapData;
  mobsData: MobData[];
};

export default function Rates(props: Props) {
  // component only renders when mobsData has length >= 1
  let averageExp = props.mobsData[0].exp;
  let averageLevel = props.mobsData[0].level;

  if (props.mobsData.length > 1) {
    const numMobs = props.mobsData.length;
    const expSum = props.mobsData
      .map((mob) => mob.exp)
      .reduce((acc, item) => acc + (item ?? 0), 0);
    const levelSum = props.mobsData
      .map((mob) => mob.level)
      .reduce((acc, item) => acc + (item ?? 0), 0);
    if (expSum && levelSum) {
      averageExp = expSum / numMobs;
      averageLevel = levelSum / numMobs;
    }
  }

  const hourlyMobs = props.mapData.capacityPerGen * 480;
  const hourlyMobsInstanced = props.mapData.sacredForce
    ? Math.min(props.mapData.capacityPerGen + 1, props.mapData.numMobs) * 480
    : 0;
  const hourlyMobsFrenzy =
    Math.min(
      Math.floor(props.mapData.capacityPerGen * 1.7),
      props.mapData.numMobs,
      49,
    ) * 1666;
  const expRate = hourlyMobs * (averageExp ? averageExp : 0);
  const mesoRate = hourlyMobs * 7.5 * (averageLevel ? averageLevel : 0);

  return (
    <>
      <RatesBase
        mapData={props.mapData}
        hourlyMobs={hourlyMobs}
        hourlyMobsInstanced={hourlyMobsInstanced}
        hourlyMobsFrenzy={hourlyMobsFrenzy}
        expRate={expRate}
        mesoRate={mesoRate}
      />
      <RatesPersonal
        mobLevels={props.mobsData.map((mob) => mob.level)}
        hourlyMobs={hourlyMobsInstanced ? hourlyMobsInstanced : hourlyMobs}
        expRate={expRate}
        mesoRate={mesoRate}
        arcaneForce={props.mapData.arcaneForce}
        sacredForce={props.mapData.sacredForce}
        starForce={props.mapData.starForce}
      />
    </>
  );
}
