import { MongoClient, Db } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

export default async (req: Request, context: Context) => {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const mobsCollection = Netlify.env.get("MONGODB_MOBS_COLLECTION");

  const client = new MongoClient(uri!);
  console.log("Pass 1");

  try {
    await client.connect();
    const db: Db = client.db(dbName!);
    const coll = db.collection(mobsCollection!);
    const cursor = coll.find({}).project({
      mob_id: 1,
      "raw.name": 1,
      "raw.meta.level": 1,
      "raw.meta.maxHP": 1,
      "raw.meta.exp": 1,
      _id: 0,
    });
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
    console.error("Error:", error);
    return new Response(error.toString(), { status: 500 });
  } finally {
    await client.close();
  }
};
