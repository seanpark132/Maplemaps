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
  const descriptions = [
    "Capacity/gen",
    "Capacity",
    "Spawn Points",
    "Mobs / hour",
    "Exp / hour",
    "Meso / hour",
    "Meso / hour (reboot)",
  ];

  const values = [
    props.mapData.capacityPerGen,
    props.mapData.capacity,
    props.mapData.numMobs,
    hourlyMobs.toLocaleString("US"),
    expRate.toLocaleString("US"),
    mesoRate.toLocaleString("US"),
    (mesoRate * 6).toLocaleString("US"),
  ];

  return (
    <div className="ml-8 rounded-lg border-2 p-8">
      <h2>Map Spawn Info:</h2>
      <p className="mb-4 mt-2 w-72 text-wrap">
        **Some capacity/gen and capacity numbers may be incorrect
      </p>
      <InfoGrid descriptions={descriptions} values={values} />
    </div>
  );
}
