import { MapData, MobData } from "../types/dataTypes";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/GlobalConstants";
import { useState } from "react";
import Rates from "../components/Rates";
import Loading from "./Loading";
import { useFetchSingleMapAndMobData } from "../hooks/useFetchSingleMapAndMobData";
import MobsInfo from "../components/MobsInfo";

type Props = {
  id: number;
  mapIds: number[];
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
};

export default function MapInfo(props: Props) {
  const [mapData, setMapData] = useState<MapData | undefined>();
  const [mobsData, setMobsData] = useState<MobData[]>([]);

  useFetchSingleMapAndMobData(
    props.id,
    props.mapsData,
    props.mobsData,
    setMapData,
    setMobsData,
  );

  if (!mapData || !props.mapIds) {
    return <Loading />;
  }

  return (
    <main className="flex w-full flex-col lg:p-6 lg:pt-0">
      <h2 className="mb-4">
        {mapData.streetName} : {mapData.name}
      </h2>
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/maps/${mapData.map_id}.png`}
        className="image-max-height mb-8 rounded-lg border-2 object-contain"
      />
      {mobsData && mobsData.length > 0 && (
        <section className="flex flex-col xl:flex-row">
          <MobsInfo mobsData={mobsData} />
          <Rates mapData={mapData} mobsData={mobsData} />
        </section>
      )}
    </main>
  );
}
