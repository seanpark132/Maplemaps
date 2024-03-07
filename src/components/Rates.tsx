import { MapData, MobData } from "../types/dataTypes";
import RatesBase from "./RatesBase";
import RatesPersonal from "./RatesPersonal";

type Props = {
  mapData: MapData;
  mobsData: (MobData | undefined)[];
};

export default function Rates(props: Props) {
  // component only renders when mobsData has length >= 1
  let averageExp = props.mobsData[0]!.raw.meta.exp;
  let averageLevel = props.mobsData[0]!.raw.meta.level;

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
  const hourlyMobsInstanced = props.mapData.sacredForce
    ? (props.mapData.capacityPerGen + 1) * 480
    : 0;
  const hourlyMobsFrenzy =
    Math.min(props.mapData.capacityPerGen * 1.7, props.mapData.numMobs) * 1666;
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
        mobLevels={props.mobsData.map((mob) => mob?.raw.meta.level)}
        hourlyMobs={hourlyMobs}
        expRate={expRate}
        mesoRate={mesoRate}
        arcaneForce={props.mapData.arcaneForce}
        sacredForce={props.mapData.sacredForce}
        starForce={props.mapData.starForce}
      />
    </>
  );
}
