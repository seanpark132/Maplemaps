import { MapData, MobData } from "../types/dataTypes";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/globalConstants";
import { useState } from "react";
import Rates from "../components/MapInfo/Rates";
import Loading from "./Loading";
import { useFetchSingleMapMobData } from "../hooks/useFetchSingleMapAndMobData";
import MobsInfo from "../components/MapInfo/MobsInfo";

type Props = {
  id: number;
  mapIds: number[];
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MapInfo(props: Props) {
  const [mapData, setMapData] = useState<MapData | undefined>();
  const [mobsData, setMobsData] = useState<MobData[]>([]);

  useFetchSingleMapMobData(
    props.id,
    props.mapsData,
    props.mobsData,
    setMapData,
    setMobsData,
    props.setIsError,
  );

  if (!mapData || !props.mapIds) {
    return <Loading />;
  }

  const mapSrcLg = `${GOOGLE_CLOUD_IMAGE_URL}/maps/lg/${mapData.map_id}.webp`;
  const mapSrcMd = `${GOOGLE_CLOUD_IMAGE_URL}/maps/md/${mapData.map_id}.webp`;
  const mapSrcSm = `${GOOGLE_CLOUD_IMAGE_URL}/maps/sm/${mapData.map_id}.webp`;

  return (
    <main className="flex w-full flex-col xl:px-10">
      <h2 className="mb-4">
        {mapData.streetName} : {mapData.name}
      </h2>
      <img
        src={mapSrcLg}
        srcSet={`${mapSrcSm} 600w, ${mapSrcMd} 1200w, ${mapSrcLg} 1932w`}
        sizes="90vw"
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
