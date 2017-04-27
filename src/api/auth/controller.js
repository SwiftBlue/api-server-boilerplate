import jwt from 'jsonwebtoken'
import moment from 'moment'
import { success, error, notAuthorized, notFound } from '../../services/response'
import User from './../../models/User'
import config from './../../config'

const expiresIn = 3600*24 // 24 Hours

export const index = (req, res, next) => {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { return error(res)(err) }

        if (!user) {
            return notAuthorized(res)()
        } else {
            verifyPassword(user, req.body.password)
                .then((response) => {
                    return success(res)(response)
                })
                .catch((err) => {
                    return notAuthorized(res)()
                })
        }

    })
}

function verifyPassword(user, password, callback) {
    return new Promise((resolve, reject) => {
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch && !err) {

                const payload = { userId: user.id }
                const token      = jwt.sign( payload, config.secretKey, { expiresIn } )
                const createdAt  = parseInt(moment().format('X'))
                const expiration = parseInt(moment().format('X')) + expiresIn

                user.updateLastLogin()
                user.updateLastTokenCreated( createdAt, expiration, token )
                return resolve({ token, expiration })

            } else {
                return reject(new Error(`Authentication failed. Invalid credentials.`))
            }
        })
    })
}
