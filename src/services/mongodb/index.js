import mongoose from 'mongoose'
import chalk from 'chalk'

export const connect = (mongoURI) => () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise
        mongoose.connect(mongoURI, (err) => {

            if (!err) {

                let icon = chalk.bold.green(`✔︎`)
                let uri  = chalk.dim.white.underline(mongoURI)
                let message = `  ${icon}  MongoDB connection successful [${uri}]`
                return resolve(message)

            } else {

                let icon     = chalk.bold.red(`✖`)
                let uri      = chalk.dim.white.underline(mongoURI)
                let text     = chalk.red.bold(`MongoDB connection was unsuccessful to URI: `, uri )
                let infoIcon = chalk.yellow.bold(`⇢`)
                let errText  = chalk.italic.yellow(err.message)
                let message  = `  ${icon}  ${text}\n  ${infoIcon}  ${errText}`
                return reject(message)

            }
            
        })
    })
}

export default { connect }
