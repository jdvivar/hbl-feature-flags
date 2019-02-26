export const asyncGApiLoad = async () => {
  if (window.gapi) {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', { callback: resolve, onerror: reject })
    })
  } else {
    return Promise.reject(new Error('Google API not available for load'))
  }
}

export const asyncGApiInit = async () => window.gapi.auth2.init({
  client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
})
