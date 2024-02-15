import { LEVEL_TO_SACRED_FORCE } from "../utils/GlobalVariables";

type Props = {
  arcaneForce: number | undefined;
  starForce: number | undefined;
  mobLevel: number | undefined;
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
      {props.starForce && (
        <div className="flex">
          <img src="/star_force.png" className="mr-1 h-4 w-4" />
          <p className="text-sm text-yellow-500">x{props.starForce}</p>
        </div>
      )}
      {props.mobLevel && props.mobLevel in LEVEL_TO_SACRED_FORCE && (
        <div className="flex items-center">
          <img src="/sacred_force.PNG" className="mr-1 h-4 w-4" />
          <p className="text-sm text-purple-300">
            x{LEVEL_TO_SACRED_FORCE[props.mobLevel]}
          </p>
        </div>
      )}
    </>
  );
}
