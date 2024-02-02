import { MongoClient, Db } from "mongodb";
import type { Context } from "@netlify/functions";
import "dotenv/config";

export default async (req: Request, context: Context) => {
  const uri = Netlify.env.get("MONGODB_URI");
  const dbName = Netlify.env.get("MONGODB_DATABASE");
  const worldMapsCollection = Netlify.env.get("MONGODB_WORLD_MAPS_COLLECTION");

  const client = new MongoClient(uri!);
  console.log("Pass 1");

  try {
    await client.connect();
    const db: Db = client.db(dbName!);
    const coll = db.collection(worldMapsCollection!);
    const cursor = coll.find({}).project({ raw: 1 });
    const results = await cursor.toArray();

    const formattedData = results.map(({ raw }) => {
      const { worldMapName, parentWorld, links, maps } = raw;

      const formattedLinks = links.map(
        ({
          linksTo,
          linkImage: {
            image,
            origin: {
              value: { x, y },
            },
          },
        }) => ({
          linksTo,
          imageBase64: image,
          x,
          y,
        }),
      );

      const formattedMaps = maps.map(
        ({
          description,
          type,
          spot: {
            value: { x, y },
          },
          mapNumbers,
        }) => ({
          description,
          type,
          x,
          y,
          mapNumbers,
        }),
      );

      return {
        worldMapName,
        parentWorld,
        links: formattedLinks,
        maps: formattedMaps,
      };
    });

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    return new Response(error.toString(), { status: 500 });
  } finally {
    await client.close();
  }
};
