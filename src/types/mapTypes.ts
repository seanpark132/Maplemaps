export type MapData = {
  map_id: number;
  name: string;
  streetName: string;
  capacityPerGen: number;
  capacity: number;
  numMobs: number;
  mobIds: number[];
  arcaneForce?: number;
  sacredForce?: number;
  starForce?: number;
};
