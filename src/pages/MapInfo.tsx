import { MapData, MapIdsNames, MobData } from "../types/dataTypes";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/globalConstants";
import { useState } from "react";
import Rates from "../components/MapInfo/Rates";
import Loading from "./Loading";
import { useFetchSingleMapMobData } from "../hooks/useFetchSingleMapAndMobData";
import MobsInfo from "../components/MapInfo/MobsInfo";

type Props = {
  map_id: number;
  mapIdsNames: MapIdsNames[];
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MapInfo(props: Props) {
  const [mapData, setMapData] = useState<MapData | undefined>();
  const [mobData, setMobData] = useState<MobData[]>([]);

  useFetchSingleMapMobData(
    props.map_id,
    props.mapsData,
    props.mobsData,
    setMapData,
    setMobData,
    props.setIsError,
  );

  if (!mapData || !props.mapIdsNames) {
    return <Loading />;
  }

  const mapSrcLg = `${GOOGLE_CLOUD_IMAGE_URL}/maps/lg/${mapData.map_id}.webp`;
  const mapSrcMd = `${GOOGLE_CLOUD_IMAGE_URL}/maps/md/${mapData.map_id}.webp`;
  const mapSrcSm = `${GOOGLE_CLOUD_IMAGE_URL}/maps/sm/${mapData.map_id}.webp`;

  return (
    <main className="flex w-full flex-col lg:px-10">
      <h2 className="mb-4">
        {mapData.streetName} : {mapData.name}
      </h2>
      <img
        src={mapSrcLg}
        srcSet={`${mapSrcSm} 600w, ${mapSrcMd} 1200w, ${mapSrcLg} 1932w`}
        sizes="90vw"
        className="image-max-height mb-8 rounded-lg border-2 object-contain"
      />
      {mobData && mobData.length > 0 && (
        <section className="flex flex-col xl:flex-row">
          <MobsInfo mobsData={mobData} />
          <Rates mapData={mapData} mobsData={mobData} />
        </section>
      )}
    </main>
  );
}
