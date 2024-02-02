import { ObjectId, Timestamp } from "mongodb";

export type WorldMapData = {
  worldMapName: string;
  parentWorld: string;
  links: Link[];
  maps: Map[];
};

export type Link = {
  linksTo: string;
  base64Image: string;
  x: number;
  y: number;
};

export type Map = {
  description: string;
  type: number;
  x: number;
  y: number;
  mapNumbers: number[];
};
