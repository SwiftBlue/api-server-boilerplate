import _ from 'lodash'
import chalk from 'chalk'
import config from './../../config'

import mongodb from './../mongodb'
import express from './../express'

export default {

    start( opts ) {
        return new Promise((resolve, reject) => {

            this
                .init( opts.env )
                    .then( console.log )
                .then( mongodb.connect(opts.mongoURI) )
                    .then( console.log )
                .then( express.start( opts ) )
                    .then( console.log )
                .then(() => {

                })
                .then((res) => {

                })
                .then( this.done )
                    .then( console.log )
                .then( resolve )
                .catch((err) => {
                    return reject(err)
                })
        })
    },

    errorHandler(err) {
        process.exit(console.log( 'Error?!', err ))
    },

    init(env='development') {
        return new Promise((resolve, reject) => {
            let header  = this.logLineBreak('\n\n')
            let envText = chalk.bold(_.toUpper( env ))
            let text    = `     API Server Started in ${envText} mode`
            let footer  = this.logLineBreak()
            let message = `${header}${text}\n${footer}`

            return resolve( message )
        })
    },

    done() {
        let message = `${logLineBreak()}\n`
        return message
    },

    logLineBreak
}

function logLineBreak(pre='', post='\n') {
    let character = _.repeat(`—`, 85)
    return chalk.white.dim(`${pre + character + post}`)
}
