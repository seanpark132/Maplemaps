import { MobData } from "../types/mobTypes";
import MobInfo from "../components/MobInfo";
import { GOOGLE_CLOUD_IMAGE_URL } from "../utils/GlobalVariables";
import { MapData } from "../types/mapTypes";
import { useEffect, useState } from "react";
import MobSpawnInfo from "../components/MobSpawnInfo";
import Loading from "./Loading";

type Props = {
  id: number;
  mapIds: number[];
  mapsData: Record<number, MapData>;
  mobsData: Record<number, MobData>;
};

export default function MapInfo(props: Props) {
  const [mapData, setMapData] = useState<MapData | undefined>();
  const [mobsData, setMobsData] = useState<(MobData | undefined)[]>([]);

  useEffect(() => {
    if (props.mapsData[props.id]) {
      const alreadyFetchedMapData = props.mapsData[props.id];
      const mobIds = alreadyFetchedMapData.mobIds;
      const alreadyFetchedMobsData = mobIds.map((id) => props.mobsData[id]);
      setMapData(alreadyFetchedMapData);
      setMobsData(alreadyFetchedMobsData);
    } else {
      const fetchData = async () => {
        try {
          const mapReq = new Request("/.netlify/functions/getMapsData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mapIds: [props.id] }),
          });

          const mapResponse = await fetch(mapReq);
          const mapData: Record<number, MapData> = await mapResponse.json();
          const mapDataValue = mapData[props.id];
          const mobIds = mapDataValue.mobIds;

          const mobReq = new Request("/.netlify/functions/getMobsData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobIds: mobIds }),
          });
          const mobResponse = await fetch(mobReq);
          const mobData: Record<number, MobData> = await mobResponse.json();
          const mobsDataArray = Object.values(mobData);
          setMapData(mapDataValue);
          setMobsData(mobsDataArray);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, []);

  if (!mapData || !mobsData || !props.mapIds) {
    return <Loading />;
  }

  return (
    <main className="flex w-full flex-col lg:p-6">
      <h2 className="my-6">
        {mapData.streetName} : {mapData.name}
      </h2>
      <img
        src={`${GOOGLE_CLOUD_IMAGE_URL}/raw/maps/${mapData.map_id}.png`}
        className="image-max-height mb-8 rounded-lg border-2 object-contain"
      />
      {mobsData && mobsData.length > 0 && (
        <section className="flex flex-col md:flex-row">
          <div className="mb-8 flex w-fit flex-col justify-center rounded-lg border-2 md:mb-0">
            {mobsData.map((mob: MobData | undefined) => {
              if (mob) {
                return <MobInfo key={mob.mob_id} mobData={mob} />;
              }
            })}
          </div>
          <MobSpawnInfo mapData={mapData} mobsData={mobsData} />
        </section>
      )}
    </main>
  );
}
