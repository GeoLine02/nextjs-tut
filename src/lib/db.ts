import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const getDB = async (dbName: string) => {
  try {
    await client.connect();
    console.log("Connected To Database");
    return client.db(dbName);
  } catch (err) {
    console.log(err);
  }
};

export const getCollection = async (collectionName: string) => {
  const db = await getDB("next-tutorial");

  if (db) return db.collection(collectionName);
  return null;
};
