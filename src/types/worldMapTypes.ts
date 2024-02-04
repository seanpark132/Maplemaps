export type WorldMapData = {
  worldMapName?: string;
  parentWorld?: string;
  links: Link[];
  maps: Map[];
};

export type Link = {
  linksTo: string;
  imageBase64: string;
  x: number;
  y: number;
};

export type Map = {
  type: number;
  x: number;
  y: number;
  mapNumbers: number[];
};
