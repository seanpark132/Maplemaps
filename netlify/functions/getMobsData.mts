import { MongoClient, Db } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

export default async (req: Request, context: Context) => {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const mobsCollection = Netlify.env.get("MONGODB_MOBS_COLLECTION");
  if (!uri) {
    ("MONGODB_URI environment variable is not set.");
    return;
  } else if (!dbName) {
    ("MONGODB_DATABASE environment variable is not set.");
    return;
  } else if (!mobsCollection) {
    ("MONGODB_MOBS_COLLECTION environment variable is not set.");
    return;
  }

  const body = await req.json();
  const mobIds = body.mobIds;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB client.");
    const db: Db = client.db(dbName);
    const coll = db.collection(mobsCollection);
    const cursor = coll.find({ mob_id: { $in: mobIds } }).project({
      mob_id: 1,
      "raw.name": 1,
      "raw.meta.level": 1,
      "raw.meta.maxHP": 1,
      "raw.meta.exp": 1,
      _id: 0,
    });
    const results = await cursor.toArray();
    const resultsObject = results.reduce((acc, item) => {
      acc[item.mob_id] = item;
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
    console.error("Error:", error);
    return new Response(error.toString(), { status: 500 });
  } finally {
    await client.close();
  }
};
