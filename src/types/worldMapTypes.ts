import { ObjectId, Timestamp } from "mongodb";

type WorldMapsData = {
  _id: ObjectId;
  target_file_name_builder: string;
  raw: Raw;
  timestamp: Timestamp;
  timestamp_epoch: EpochTimeStamp;
  is_region_map: boolean;
};

type Raw = {
  worldMapName: string;
  parentWorld: string;
  baseImage: any[];
  links: Link[];
  maps: Map[];
};

type Link = {
  toolTip: string;
  linksTo: string;
  linkImage: LinkImage;
};

type LinkImage = {
  image: string;
  origin: Origin;
  originOrZero: CoordsIsEmpty;
  mapOffset: any;
  position: string;
};

type Origin = {
  hasValue: boolean;
  value: CoordsIsEmpty;
};

type CoordsIsEmpty = {
  x: number;
  y: number;
  isEmpty: boolean;
};

type Map = {
  spot: Spot;
  type: number;
  mapNumbers: number[];
};

type Spot = {
  hasValue: boolean;
  value: CoordsIsEmpty;
};
