
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
let cachedDb;
const client = new MongoClient(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default async function db() {
  if (cachedDb) {
    return { db: cachedDb, client };
  }
  await client.connect();
  const db = client.db(process.env.DATABASE);
  cachedDb = db;
  return { db, client };
}