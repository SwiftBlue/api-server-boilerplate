import passport from 'passport'
import jwtStrategy from './strategies/jwt.js'
import { notAuthorized } from './../response'
import User from './../../models/User.js'

/**
 *    Authenticate request via JSON Web Token
 */

jwtStrategy(passport)

/**
 *    Middleware to use on routes that require authentication
 */

export const check = passport.authenticate('jwt', { session: false })

export default { check }
