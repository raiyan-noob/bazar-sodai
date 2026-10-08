import { setServers } from "node:dns";
import { MongoClient } from "mongodb";

setServers(["1.1.1.1", "8.8.8.8"]);

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not configured. Add it to your environment variables.");
}

const applyRepair = process.argv.includes("--apply");
const client = new MongoClient(mongoUri);

try {
  await client.connect();

  const db = client.db("BazarSodai");
  const orphanedAccounts = await db
    .collection("account")
    .aggregate([
      { $match: { providerId: { $ne: "credential" } } },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "linkedUser",
        },
      },
      { $match: { linkedUser: { $eq: [] } } },
      { $project: { _id: 1, providerId: 1 } },
    ])
    .toArray();

  if (orphanedAccounts.length === 0) {
    console.log("No orphaned OAuth account records found.");
  } else if (!applyRepair) {
    console.log(`Found ${orphanedAccounts.length} orphaned OAuth account record(s):`);
    for (const account of orphanedAccounts) {
      console.log(`- provider=${account.providerId}, accountRecordId=${account._id}`);
    }
    console.log("No records were changed. Re-run with -- --apply to remove these records.");
  } else {
    const result = await db.collection("account").deleteMany({
      _id: { $in: orphanedAccounts.map(({ _id }) => _id) },
    });
    console.log(`Removed ${result.deletedCount} orphaned OAuth account record(s).`);
  }
} finally {
  await client.close();
}
