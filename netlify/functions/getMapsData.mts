import { MongoClient, Db } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

export default async (req: Request, context: Context) => {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const mapsCollection = Netlify.env.get("MONGODB_MAPS_COLLECTION");

  if (!uri) {
    throw new Error("The MONGODB_URI environment variable is not defined.");
  }
  if (!dbName) {
    throw new Error(
      "The MONGODB_DATABASE environment variable is not defined.",
    );
  }
  if (!mapsCollection) {
    throw new Error(
      "The MONGODB_WORLD_MAPS_COLLECTION environment variable is not defined.",
    );
  }
  const client = new MongoClient(uri);
  console.log("Pass 1");

  try {
    await client.connect();
    const db: Db = client.db(dbName);
    const coll = db.collection(mapsCollection!);
    const cursor = coll.find();
    const results = await cursor.toArray();

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    return new Response(error.toString(), { status: 500 });
  } finally {
    await client.close();
  }
};
