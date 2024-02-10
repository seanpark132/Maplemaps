import { MobData } from "../types/mobTypes";

type Props = {
  spawnPoints: number;
  mobsData: (MobData | undefined)[];
};

export default function MobSpawnInfo(props: Props) {
  let capacity = props.spawnPoints - 1;
  if (props.spawnPoints > 40) {
    capacity = 39;
  }
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

  const hourlyMobs = capacity * 480;
  const expRate = hourlyMobs * averageExp;
  const mesoRate = hourlyMobs * 7.5 * averageLevel;

  return (
    <div className="h-full rounded-lg border-2">
      <ul>
        <li>Capacity: {capacity}</li>
        <li>Spawn Points: {props.spawnPoints}</li>
        <li>Mobs / hour: {hourlyMobs}</li>
        <li>Exp / hour (base): {expRate.toLocaleString("US")}</li>
        <li>Meso / hour (base): {mesoRate.toLocaleString("US")}</li>
      </ul>
    </div>
  );
}
