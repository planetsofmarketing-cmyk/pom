import dns from 'node:dns';
import { MongoClient, Db } from 'mongodb';

// Fix for 'querySrv ECONNREFUSED' errors on certain networks/Windows setups
// This forces Node.js to use Google's DNS servers for SRV record resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
  console.warn('Failed to set DNS servers:', error);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI as string, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });

  await client.connect();
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
