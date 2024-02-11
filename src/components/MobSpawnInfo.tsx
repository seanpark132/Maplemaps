import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";

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

  return (
    <div className="ml-8 rounded-lg border-2 p-8">
      <ul>
        <li>Capacity/gen: {props.mapData.capacityPerGen}</li>
        <li>Capacity: {props.mapData.capacity}</li>
        <li>Spawn Points: {props.mapData.numMobs}</li>
        <li>Mobs / hour: {hourlyMobs.toLocaleString("US")}</li>
        <li>Exp / hour (base): {expRate.toLocaleString("US")}</li>
        <li>Meso / hour (base): {mesoRate.toLocaleString("US")}</li>
        <li>
          Reboot Meso / hour (base): {(mesoRate * 6).toLocaleString("US")}
        </li>
      </ul>
    </div>
  );
}
