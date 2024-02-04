type Props = {
  mapNumber: number;
  mapsData: any[];
};

export default function MapDotHover(props: Props) {
  const mapData = props.mapsData.find((map) => map.map_id === props.mapNumber);

  return (
    <>
      {mapData && (
        <span className="map-dot-hover-container absolute bottom-1/2 left-1/2 z-20 w-fit min-w-16 rounded-md border-black bg-black p-2">
          <p className="text-nowrap text-xs">{mapData.map_name}</p>
        </span>
      )}
    </>
  );
}
