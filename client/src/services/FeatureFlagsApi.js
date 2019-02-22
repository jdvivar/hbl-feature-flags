const apiRoot = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/flags'
  : 'https://my-json-server.typicode.com/jdvivar/hbl-feature-flags/flags'

const FeatureFlagsApi = {
  get: async () => (await fetch(apiRoot, {
    method: 'GET'
  })).json(),

  put: async (id, body) => (await fetch(`${apiRoot}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })).json(),

  post: async (body) => (await fetch(apiRoot, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })).json(),

  delete: async (id) => (await fetch(`${apiRoot}/${id}`, {
    method: 'DELETE'
  })).json()
}

export default FeatureFlagsApi
