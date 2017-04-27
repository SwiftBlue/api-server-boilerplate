import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from './../../../models/User.js'
import config from './../../../config'

const defaultOpts = {
    secretOrKey:    config.secretKey,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeader(),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    ])
}

export default function(passport=false, opts=defaultOpts) {
    if (!passport) throw new Error(`Passport must be injected into a strategy`)
    passport.use(new JwtStrategy( opts, verifyUser ))
}

function verifyUser(payload, done) {

    User.findById(payload.userId, (err, user) => {
        if (err) { return done(err, false) }

        if (user) {
            user.updateLastAction()
            user.updateLastTokenUsed( payload.iat, payload.exp )
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}
