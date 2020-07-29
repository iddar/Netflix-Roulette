require('dotenv').config()
import { connectToDatabase } from '../src/db'
import { cors, response } from '../src/http'

const { DB_URI, DB_COLLECTION } = process.env

export async function to (promise) {
  try {
    const data = await promise;
    return [null, data]
  }
  catch (err) {
    console.debug(err)
    return [err]
  }
}

async function getMovie (_event, _context) {
  const query = [{ '$sample': { 'size': 1 } }]

  const [conectionErr, db] = await to(connectToDatabase(DB_URI))
  if (conectionErr) return response(500, 'Internal Error')

  const title = await db.collection(DB_COLLECTION).aggregate(query).toArray()
  if (title == null) return response(500, 'Internal Error')

  console.log(title)
  return response(200, title[0])
}

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  switch (event.httpMethod) {
    case 'OPTIONS': return cors('POST'); break
    case 'GET': return getMovie(event, context, callback); break
    default: return response(405, 'Method Not Allowed')
  }
}
