const ARCANE_RIVER_WORLD_MAPS: string[] = [
  "WorldMap082",
  "WorldMap0821",
  "WorldMap0822",
  "WorldMap0823",
  "WorldMap0824",
  "WorldMap0825",
  "WorldMap0826",
  "WorldMap0827",
  "WorldMap08271",
  "WorldMap08272",
  "WorldMap08273",
  "WorldMap0828",
  "WorldMap0829",
  "WorldMap082a",
];

const GRANDIS_WORLD_MAPS: string[] = [
  "WorldMap130",
  "WorldMap140",
  "WorldMap141",
  "WorldMap180",
  "WorldMap181",
  "WorldMap190",
  "WorldMap191",
  "WorldMap192",
  "WorldMap200",
  "WorldMap210",
  "WorldMap220",
  "WorldMap260",
  "CGWorldMap",
  "GWorldMap",
  "WorldMap230",
  "WorldMap240",
  "WorldMap250",
  "WorldMap270",
  "WorldMap280",
  "WorldMap290",
  "WorldMap300",
  "WorldMap310",
];

const MAPLE_WORLD_MAPS: string[] = [
  "WorldMap000",
  "MWorldMap",
  "WorldMap0101",
  "WorldMap0102",
  "WorldMap0103",
  "WorldMap011",
  "SWorldMap",
  "WorldMap010",
  "WorldMap016",
  "WorldMap012",
  "WorldMap015",
  "WorldMap017",
  "WorldMap018",
  "WorldMap019",
  "WorldMap020",
  "WorldMap021",
  "WorldMap022",
  "WorldMap031",
  "WorldMap032",
  "WorldMap033",
  "WorldMap",
  "WorldMap035",
  "WorldMap030",
  "WorldMap034",
  "WorldMap040",
  "WorldMap051",
  "WorldMap052",
  "WorldMap072",
  "WorldMap061",
  "WorldMap050",
  "WorldMap070",
  "WorldMap060",
  "WorldMap080",
  "WorldMap081",
  "WorldMap08221",
  "WorldMap100",
  "WorldMap090",
  "WorldMap111",
  "WorldMap101",
  "WorldMap120",
  "WorldMap110",
  "WorldMap153",
  "WorldMap155",
  "WorldMap154",
  "WorldMap161",
  "WorldMap163",
  "WorldMap162",
  "WorldMap169",
  "WorldMap170",
  "WorldMap172",
  "WorldMap173",
  "WorldMap160",
  "WorldMap175",
  "WorldMap174",
  "WorldMapCN",
  "WorldMap177",
  "WorldMap0121",
];

const ARCANE_RIVER_WORLD_MAP_NAME: string = "WorldMap082";
const GRANDIS_WORLD_MAP_NAME: string = "GWorldMap";
const MAPLE_WORLD_MAP_NAME: string = "WorldMap";

const ORIGIN_X: number = 320;
const ORIGIN_Y: number = 235;

const WORLD_MAP_OFFSETS = {
  GWorldMap: { x: 0, y: 2 },
  WorldMap290: { x: 0, y: 2 },
  WorldMap033: { x: 6, y: 6 },
  WorldMap0121: { x: 6, y: 8 },
};

const MAP_DOT_NUMBERS: number[] = [
  0, 1, 2, 3, 8, 9, 10, 11, 12, 28, 29, 47, 48, 49,
];

const LINK_AREA_Z_INDEX: string[] = ["WorldMap030", "WorldMap170"];

const GOOGLE_CLOUD_IMAGE_URL: string =
  "https://storage.googleapis.com/maplemaps-2ab75.appspot.com";

export {
  ARCANE_RIVER_WORLD_MAPS,
  GRANDIS_WORLD_MAPS,
  MAPLE_WORLD_MAPS,
  ARCANE_RIVER_WORLD_MAP_NAME,
  GRANDIS_WORLD_MAP_NAME,
  MAPLE_WORLD_MAP_NAME,
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
  MAP_DOT_NUMBERS,
  LINK_AREA_Z_INDEX,
  GOOGLE_CLOUD_IMAGE_URL,
};
