const ORIGIN_X = 320;
const ORIGIN_Y = 235;

const WORLD_MAP_OFFSETS = {
  GWorldMap: { x: 0, y: 2 },
  WorldMap290: { x: 0, y: 2 },
  WorldMap033: { x: 6, y: 6 },
  WorldMap0121: { x: 6, y: 8 },
};

const MAP_DOT_NUMBERS = [0, 1, 2, 3, 8, 9, 10, 11, 12, 28, 29, 47, 48, 49];

const LEVEL_TO_SACRED_FORCE = {
  260: 30,
  261: 30,
  262: 50,
  263: 50,
  264: 50,
  265: 70,
  266: 70,
  267: 70,
  268: 100,
  269: 100,
  270: 130,
  271: 160,
  272: 180,
  273: 200,
  274: 200,
  275: 230,
  276: 260,
  277: 280,
  278: 300,
  279: 300,
  280: 330,
  281: 330,
  282: 360,
  283: 360,
  284: 400,
  285: 430,
  286: 430,
  287: 460,
  288: 460,
  289: 500,
};

const LINK_AREA_Z_INDEX = ["WorldMap030", "WorldMap170"];

const GOOGLE_CLOUD_IMAGE_URL =
  "https://storage.googleapis.com/maplemaps-2ab75.appspot.com";

export {
  ORIGIN_X,
  ORIGIN_Y,
  WORLD_MAP_OFFSETS,
  MAP_DOT_NUMBERS,
  LEVEL_TO_SACRED_FORCE,
  LINK_AREA_Z_INDEX,
  GOOGLE_CLOUD_IMAGE_URL,
};
