import { MongoClient, Db } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

export async function POST(req: Request, context: Context) {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const worldMapsCollection = Netlify.env.get("MONGODB_WORLD_MAPS_COLLECTION");
  if (!uri) {
    ("MONGODB_URI environment variable is not set.");
    return;
  } else if (!dbName) {
    ("MONGODB_DATABASE environment variable is not set.");
    return;
  } else if (!worldMapsCollection) {
    ("MONGODB_WORLD_MAPS_COLLECTION environment variable is not set.");
    return;
  }

  const body = await req.json();
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log("Connected to MongoDB client.");
    const db: Db = client.db(dbName);
    const coll = db.collection(worldMapsCollection);
    const cursor = coll.find({ worldMapName: { $in: body } }).project({
      _id: 0,
    });
    const results = await cursor.toArray();
    const resultsObject = results.reduce((acc, item) => {
      acc[item.worldMapName] = item;
      return acc;
    }, {});

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return new Response(JSON.stringify(resultsObject), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    return new Response(error.toString(), { status: 500 });
  } finally {
    await client.close();
  }
}
