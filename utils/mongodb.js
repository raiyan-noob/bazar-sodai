import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const globalForMongo = globalThis;

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(uri);
}

export const mongoClient = globalForMongo._mongoClient;
export const db = mongoClient.db();