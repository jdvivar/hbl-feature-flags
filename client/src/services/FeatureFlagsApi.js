const apiRoot = 'http://localhost:3000/flags'

const FeatureFlagsApi = {
  get: async () => (await fetch(apiRoot, { method: 'GET' })).json()
}

export default FeatureFlagsApi
