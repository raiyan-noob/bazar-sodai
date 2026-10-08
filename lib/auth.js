import { betterAuth } from "better-auth";
import { setServers } from "node:dns";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

setServers(["1.1.1.1", "8.8.8.8"]); // same DNS workaround as your Dispatch BD setup

let authInstance;

export function getAuth() {
  if (authInstance) return authInstance;

  const mongodbUrl = process.env.MONGODB_URI;
  if (!mongodbUrl) {
    throw new Error("MONGODB_URI is not configured. Add it to your environment variables.");
  }

  const client = new MongoClient(mongodbUrl);
  const db = client.db("BazarSodai");

  authInstance = betterAuth({
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    /*
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
    */
    database: mongodbAdapter(db, { client }),
  });

  return authInstance;
}