import jwt from 'jsonwebtoken'
import { success, error, notFound } from '../../services/response'
import User from './../../models/User'

export const create = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return error(res, 401)( new Error(`Email and password are required to register`))
    }

    else {
        var newUser = new User({
            email:    req.body.email,
            password: req.body.password,
            roles:    [ 'user' ],
            profile:  {
                name: req.body.name || null
            },
        })

        newUser.save(function(err) {
            if (err) { return error(res)( new Error(`That email address is already registered`)) }
            return success(res)(`New user successfully created, please login via /auth`)
        })
    }
}
