import { MongoClient } from 'mongodb'
const { DATABASE } = process.env

let cachedDb = null;
const clientConf ={
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export function connectToDatabase (uri) {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(uri, clientConf)
    .then(client => {
      const db = client.db(DATABASE);
      cachedDb = db;
      return cachedDb;
    });
}
