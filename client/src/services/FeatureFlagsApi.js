const apiRoot = 'http://localhost:3000/flags'

const FeatureFlagsApi = {
  get: async () => (await fetch(apiRoot, {
    method: 'GET'
  })).json(),

  put: async (id, body) => (await fetch(`${apiRoot}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })).json(),

  post: async (id, body) => (await fetch(`${apiRoot}/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })).json(),

  delete: async (id) => (await fetch(`${apiRoot}/${id}`, {
    method: 'DELETE'
  })).json()
}

export default FeatureFlagsApi
