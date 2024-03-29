export type WorldMapData = {
  worldMapName: string;
  parentWorld?: string;
  links: Link[];
  maps: Map[];
};

export type Link = {
  linksTo: string;
  x: number;
  y: number;
};

export type Map = {
  noTooltip?: boolean;
  description?: string;
  type: number;
  x: number;
  y: number;
  mapNumbers: number[];
};

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

export type MobData = {
  mob_id: number;
  name: string;
  level: number;
  maxHP: number | { $numberLong: string };
  exp: number;
};

export type ConfigState = {
  expMulti: Record<string, string>;
  expAdditive: Record<string, string>;
};

export type MapIdsNames = { map_id: number; name: string };
