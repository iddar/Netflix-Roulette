export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH",
  "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
}

export function responseError (code = 404 , error) {
  console.log('=> an error occurred: ', error)
  return {
    headers,
    statusCode: code,
    body: JSON.stringify({ error: String(error) })
  }
}

export function response (code, payload) {
  if (code >= 400) return responseError(code, payload)
  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}

export async function cors (...methods) {
  const defaultMethods = ['OPTIONS']
  const response = {
    statusCode: 200,
    headers: {
      ...headers,
      "Access-Control-Allow-Methods": defaultMethods.concat(methods).join(',').toUpperCase(),
    },
    body: "Ok!"
  }
  return response
}

export function parseBody (body) {
  try {
    return JSON.parse(body);
  } catch (_err) {
    return null
  }
}
