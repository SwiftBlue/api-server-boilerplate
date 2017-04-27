import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import logger from 'morgan'
import cors from 'cors'
import errorHandler from 'errorhandler'
import expressStatusMonitor from 'express-status-monitor'
import expressValidator from 'express-validator'
import passport from 'passport'
import path from 'path'
import httpAuth from 'http-auth'

export const start = ({routes, port=3000, env='development', apiPrefix=false, statusPage}) => () => {
    return new Promise((resolve, reject) => {
        const app = express()

        serviceStatusPage(app, statusPage)

        app.set('port', port)
        app.use(compression())
        app.use(logger('dev'))
        app.use(expressValidator())
        app.use(cors())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(passport.initialize())

        if (env === 'development') {
            app.use(errorHandler())
        }

        if (!apiPrefix) {
            app.use(routes)
        } else {
            app.use(apiPrefix, routes)
        }

        app.listen(app.get('port'), () => {
            return resolve(successMessage({ port, apiPrefix }))
        })
    })
}

export default { start }

function successMessage(vars) {
    let icon    = chalk.bold.green('✔︎')
    let url     = chalk.green.bold.underline(`http://localhost:${vars.port}${vars.apiPrefix}`)
    let stopMsg = chalk.dim.italic(`     Press CTRL-C to stop`)
    let message = `  ${icon}  API server running at ${url}\n\n${stopMsg}\n`
    return message
}

// Express Service Status Page
function serviceStatusPage(app, statusPage) {
    const statusMonitor = expressStatusMonitor({
        title: statusPage.title,
        path:  statusPage.url
    })

    const statusPageAuth = httpAuth.basic({
        realm: statusPage.realm
    }, (user, pass, callback) => {
        callback( user === statusPage.login.user && pass === statusPage.login.pass )
    })

    app.get(statusPage.url, httpAuth.connect(statusPageAuth), statusMonitor.pageRoute)
    app.use(statusMonitor)
}
