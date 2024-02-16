type Props = {
  arcaneForce: number | undefined;
  sacredForce: number | undefined;
  starForce: number | undefined;
};

export default function MapForceText(props: Props) {
  return (
    <>
      {props.arcaneForce && (
        <div className="flex">
          <img src="/arcane_force.png" className="mr-1 h-4 w-4" />
          <p className="text-sm text-purple-300">x{props.arcaneForce}</p>
        </div>
      )}
      {props.sacredForce && (
        <div className="flex">
          <img src="/sacred_force.PNG" className="mr-1 h-4 w-4" />
          <p className="text-sm text-yellow-500">x{props.sacredForce}</p>
        </div>
      )}
      {props.starForce && (
        <div className="flex">
          <img src="/star_force.png" className="mr-1 h-4 w-4" />
          <p className="text-sm text-yellow-500">x{props.starForce}</p>
        </div>
      )}
    </>
  );
}
