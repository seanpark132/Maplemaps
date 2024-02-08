import { MongoClient, Db } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

export default async (req: Request, context: Context) => {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const mapsCollection = Netlify.env.get("MONGODB_MAPS_COLLECTION");

  const client = new MongoClient(uri!);
  console.log("Pass 1");

  try {
    await client.connect();
    const db: Db = client.db(dbName!);
    const coll = db.collection(mapsCollection!);
    // const pipeline = [
    //   {$project: {
    //     _id:0,
    //     target_full_file_path:1, map_id:1, map_name:1,"raw.mobs."

    //   }}
    // ]
    const cursor = coll
      .find({})
      .project({
        target_full_file_path: 1,
        map_id: 1,
        map_name: 1,
        "raw.mobs": 1,
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
    return new Response(error.toString(), { status: 500 });
  } finally {
    await client.close();
  }
};
