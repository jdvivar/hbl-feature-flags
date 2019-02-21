import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

Amplify.configure({
    Auth: {
        identityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOL_ID,
        region: process.env.VUE_APP_AWS_REGION
    }
})
