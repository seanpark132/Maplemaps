import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import InfoGrid from "./InfoGrid";

type Props = {
  mapData: MapData;
  mobsData: (MobData | undefined)[];
};

export default function MobSpawnInfo(props: Props) {
  let averageExp = 0;
  let averageLevel = 0;

  const expArray = props.mobsData.map((mob) => mob?.raw.meta.exp);
  const levelArray = props.mobsData.map((mob) => mob?.raw.meta.level);
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
    "Capacity/gen",
    "Capacity",
    "Spawn Points",
    "Mobs / hour",
    "Exp / hour",
    "Meso / hour",
    "Meso / hour (reboot)",
  ];

  let values = [
    props.mapData.capacityPerGen,
    props.mapData.capacity,
    props.mapData.numMobs,
    hourlyMobs.toLocaleString("US"),
    expRate.toLocaleString("US"),
    mesoRate.toLocaleString("US"),
    (mesoRate * 6).toLocaleString("US"),
  ];

  let forceValue = undefined;
  let forceDescription = undefined;
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
    values.unshift(forceValue);
    descriptions.unshift(forceDescription);
  }

  return (
    <div className="w-fit rounded-lg border-2 p-4 md:ml-8 md:p-8">
      <h2>Map Info:</h2>
      <p className="mb-4 mt-2 w-64 text-wrap">
        **Some capacity/gen and capacity numbers may be incorrect
      </p>
      <InfoGrid descriptions={descriptions} values={values} />
    </div>
  );
}
