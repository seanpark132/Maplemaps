import { MongoClient, Db, Collection } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

type MapData = {
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

type MobData = {
  mob_id: number;
  raw: Raw;
};

type Raw = {
  meta: Meta;
  name: string;
};

type Meta = {
  level: number;
  maxHP?: number | MaxHP;
  exp?: number;
};

type MaxHP = {
  $numberLong: string;
};

type WorldMapData = {
  worldMapName?: string;
  parentWorld?: string;
  links: Link[];
  maps: Map[];
};

type Link = {
  linksTo: string;
  imageBase64: string;
  x: number;
  y: number;
};

type Map = {
  noTooltip?: boolean;
  description?: string;
  type: number;
  x: number;
  y: number;
  mapNumbers: number[];
};

let cachedDb: null | Db = null;

async function connectToDatabase(uri: string, dbName: string) {
  if (cachedDb) {
    console.log("Db is already cached.");
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedDb = db;
  return db;
}

export default async (req: Request, context: Context) => {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const worldMapsCollection = Netlify.env.get("MONGODB_WORLD_MAPS_COLLECTION");
  const mapsCollection = Netlify.env.get("MONGODB_MAPS_COLLECTION");
  const mobsCollection = Netlify.env.get("MONGODB_MOBS_COLLECTION");
  if (
    !uri ||
    !dbName ||
    !worldMapsCollection ||
    !mapsCollection ||
    !mobsCollection
  ) {
    console.log("A MongoDB env variable is not defined.");
  }

  async function getData(
    coll: Collection<Document>,
    findQuery: Record<string, Record<string, (string | number)[]>>,
    projectQuery: Record<string, number>,
  ) {
    const cursor = coll.find(findQuery).project(projectQuery);
    const results = await cursor.toArray();
    return results;
  }

  async function getMapIds(db: Db) {
    const coll: Collection<Document> = db.collection(mapsCollection!);
    const findQuery = {};
    const projectQuery = { map_id: 1, _id: 0 };
    const results = await getData(coll, findQuery, projectQuery);
    const mapIdsOnlyArray: number[] = results.map((obj) => obj.map_id);
    return mapIdsOnlyArray;
  }

  async function getMapsData(db: Db, mapIds: number[]) {
    const coll: Collection<Document> = db.collection(mapsCollection!);
    const findQuery = { map_id: { $in: mapIds } };
    const projectQuery = { _id: 0 };
    const results = await getData(coll, findQuery, projectQuery);
    const resultsObject: Record<string, MapData> = results.reduce(
      (acc, item) => {
        acc[item.map_id] = item;
        return acc;
      },
      {},
    );
    return resultsObject;
  }

  async function getMobsData(db: Db, mobIds: number[]) {
    const coll: Collection<Document> = db.collection(mobsCollection!);
    const findQuery = { mob_id: { $in: mobIds } };
    const projectQuery = {
      mob_id: 1,
      "raw.name": 1,
      "raw.meta.level": 1,
      "raw.meta.maxHP": 1,
      "raw.meta.exp": 1,
      _id: 0,
    };
    const results = await getData(coll, findQuery, projectQuery);
    const resultsObject: Record<number, MobData> = results.reduce(
      (acc, item) => {
        acc[item.mob_id] = item;
        return acc;
      },
      {},
    );
    return resultsObject;
  }

  async function getWorldMapsData(db: Db, worldMapNames: string[]) {
    const coll: Collection<Document> = db.collection(worldMapsCollection!);
    const findQuery = { worldMapName: { $in: worldMapNames } };
    const projectQuery = { _id: 0 };
    const results = await getData(coll, findQuery, projectQuery);
    const resultsObject: Record<string, WorldMapData> = results.reduce(
      (acc, item) => {
        acc[item.worldMapName] = item;
        return acc;
      },
      {},
    );
    return resultsObject;
  }

  try {
    const db: Db = await connectToDatabase(uri!, dbName!);
    console.log("Connected to MongoDB client.");

    const body = await req.json();
    let response:
      | undefined
      | number[]
      | Record<string, MapData>
      | Record<number, MobData>
      | Record<string, WorldMapData>;
    if (body.reqType === "mapIds") {
      response = await getMapIds(db);
    } else if (body.reqType === "mapsData") {
      response = await getMapsData(db, body.mapIds);
    } else if (body.reqType === "mobsData") {
      response = await getMobsData(db, body.mobIds);
    } else if (body.reqType === "worldMapsData") {
      response = await getWorldMapsData(db, body.worldMapNames);
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(error.toString(), { status: 500 });
  }
};
