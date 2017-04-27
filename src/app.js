import chalk from 'chalk'
import server from './services/server'
import config from './config'
import routes from './routes.js'

/**
 *    Server Options
 */
const opts = {
    port:       config.port,
    mongoURI:   config.mongoURI,
    env:        config.env,
    apiPrefix:  config.apiPrefix,
    statusPage: config.statusPage,
    routes
}

/**
 *    Start the Server
 */
server.start(opts)
    .then( handleSuccess )
    .catch( handleError )


function handleSuccess() {
    // Server is up and running properly
}

function handleError(error) {
    //  Server did not start because of an error
    if (typeof error == 'object') { console.log( 'Error:', error ) }
    else {
        let exitIcon = chalk.bold.cyan(`⚠`)
        let exitMsg  = chalk.cyan(`Server shutting down ... ${chalk.bold.italic(`exiting now`)}`)
        let message  = `${error}\n\n  ${exitIcon}  ${exitMsg}\n`
        console.log( `${message}\n${server.logLineBreak()}\n` )
    }

    process.exit(1)
}
