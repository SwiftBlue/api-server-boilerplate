import dotenv from 'dotenv'
import path from 'path'
import _ from 'lodash'

dotenv.load({ path: '.env' })

const config = {
    env:             _.toLower(process.env.NODE_ENV),
    port:            process.env.PORT || 3000,
    apiPrefix:       process.env.API_PREFIX || false,
    secretKey:       process.env.SECRET_KEY || false,
    mongoURI:        process.env.MONGODB_URI || false,
    statusPage: {
        url:   process.env.STATUS_PAGE_URL   || '/status',
        title: process.env.STATUS_PAGE_TITLE || 'API Service Status Monitor',
        realm: process.env.STATUS_PAGE_REALM || 'API Service Monitoring Area',
        login: {
            user: process.env.STATUS_PAGE_USER || 'admin',
            pass: process.env.STATUS_PAGE_PASS || 'password'
        }
    }
}

export default config
