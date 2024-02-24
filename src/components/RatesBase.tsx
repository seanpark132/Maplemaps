import { MapData } from "../types/mapTypes";
import { MobData } from "../types/mobTypes";
import InfoGrid from "./InfoGrid";

type Props = {
  mapData: MapData;
  mobsData: (MobData | undefined)[];
  hourlyMobs: number;
  expRate: number;
  mesoRate: number;
};

export default function RatesBase(props: Props) {
  const descriptions = [
    "Mobs / hour",
    "Exp / hour",
    "Meso / hour",
    "Meso / hour (reboot)",
    "Capacity/gen",
    "Capacity",
    "Spawn Points",
    ...(props.mapData.arcaneForce ? ["Arcane Force"] : []),
    ...(props.mapData.sacredForce ? ["Sacred Force"] : []),
    ...(props.mapData.starForce ? ["Star Force"] : []),
  ];

  const values = [
    props.hourlyMobs.toLocaleString("US"),
    props.expRate.toLocaleString("US"),
    props.mesoRate.toLocaleString("US"),
    (props.mesoRate * 6).toLocaleString("US"),
    props.mapData.capacityPerGen,
    props.mapData.capacity,
    props.mapData.numMobs,
    ...(props.mapData.arcaneForce ? [props.mapData.arcaneForce] : []),
    ...(props.mapData.sacredForce ? [props.mapData.sacredForce] : []),
    ...(props.mapData.starForce ? [props.mapData.starForce] : []),
  ];

  return (
    <article className="h-fit w-fit rounded-lg border-2 p-4 md:ml-8 md:p-8">
      <h2>Base Rates:</h2>
      <p className="mb-4 mt-2 w-64 text-wrap">
        **Some capacity/gen and capacity numbers may be incorrect
      </p>
      <InfoGrid descriptions={descriptions} values={values} />
    </article>
  );
}
