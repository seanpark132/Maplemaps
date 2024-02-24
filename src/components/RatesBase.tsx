import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import InfoGrid from "./InfoGrid";

type Props = {
  mapData: MapData;
  mobData: (MobData | undefined)[];
};

export default function RatesBase(props: Props) {
  let averageExp = 0;
  let averageLevel = 0;

  const expArray = props.mobData.map((mob) => mob?.raw.meta.exp);
  const levelArray = props.mobData.map((mob) => mob?.raw.meta.level);
  const expSum = expArray.reduce((acc, item) => acc! + (item ?? 0), 0);
  const levelSum = levelArray.reduce((acc, item) => acc! + (item ?? 0), 0);
  if (expArray && expSum) {
    averageExp = expSum / expArray.length;
  }
  if (levelArray && levelSum) {
    averageLevel = levelSum / levelArray.length;
  }

  const hourlyMobs = props.mapData.capacityPerGen * 480;
  const expRate = hourlyMobs * averageExp;
  const mesoRate = hourlyMobs * 7.5 * averageLevel;

  let descriptions = [
    "Mobs / hour",
    "Exp / hour",
    "Meso / hour",
    "Meso / hour (reboot)",
    "Capacity/gen",
    "Capacity",
    "Spawn Points",
  ];

  let values = [
    hourlyMobs.toLocaleString("US"),
    expRate.toLocaleString("US"),
    mesoRate.toLocaleString("US"),
    (mesoRate * 6).toLocaleString("US"),
    props.mapData.capacityPerGen,
    props.mapData.capacity,
    props.mapData.numMobs,
  ];

  let forceValue, forceDescription;

  if (props.mapData.arcaneForce) {
    forceValue = props.mapData.arcaneForce;
    forceDescription = "Arcane Force";
  } else if (props.mapData.sacredForce) {
    forceValue = props.mapData.sacredForce;
    forceDescription = "Sacred Force";
  } else if (props.mapData.starForce) {
    forceValue = props.mapData.starForce;
    forceDescription = "Star Force";
  }

  if (forceValue && forceDescription) {
    values.push(forceValue);
    descriptions.push(forceDescription);
  }

  return (
    <article className="w-fit rounded-lg border-2 p-4 md:ml-8 md:p-8">
      <h2>Base Rates:</h2>
      <p className="mb-4 mt-2 w-64 text-wrap">
        **Some capacity/gen and capacity numbers may be incorrect
      </p>
      <InfoGrid descriptions={descriptions} values={values} />
    </article>
  );
}
