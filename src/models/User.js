import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'
import mongoose from 'mongoose'
import moment from 'moment'

const schema = new mongoose.Schema({
    email:                { type: String, unique: true },
    password:             String,
    passwordResetToken:   String,
    passwordResetExpires: Date,

    lastLoginAt:   Date,
    lastActionAt:  Date,

    lastTokenUsed: {
        token:     String,
        createdAt: Date,
        expiresAt: Date
    },

    lastTokenCreated: {
        token:     String,
        createdAt: Date,
        expiresAt: Date
    },

    roles: {
        type:    Array,
        default: ['user']
    },

    profile: {
        name:     String,
        gender:   String,
        zipCode:  String
    }
},
{
    timestamps: true
})

/**
 *  Password hash middleware.
 */
schema.pre('save', function save(next) {
    const user = this

    if (!user.isModified('password')) { return next() }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})

/**
 *  Helper method for validating user's password.
 */
schema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}

/**
 *  Helper method for getting user's gravatar.
 */
schema.methods.gravatar = function gravatar(size) {
    if (!size) { size = 200 }
    if (!this.email) { return `https://gravatar.com/avatar/?s=${size}&d=retro` }

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

schema.methods.updateLastLogin = function updateLastLogin() {
    this.lastLoginAt = new Date()
    this.save()
}

schema.methods.updateLastAction = function updateLastAction() {
    this.lastActionAt = new Date()
    this.save()
}

schema.methods.updateLastTokenUsed = function updateLastTokenUsed( createdAt, expiresAt, token=null ) {
    this.lastTokenUsed.token     = token
    this.lastTokenUsed.createdAt = moment.unix(createdAt).toISOString()
    this.lastTokenUsed.expiresAt = moment.unix(expiresAt).toISOString()
    this.save()
}

schema.methods.updateLastTokenCreated = function updateLastTokenCreated( createdAt, expiresAt, token=null ) {
    this.lastTokenCreated.token     = token
    this.lastTokenCreated.createdAt = moment.unix(createdAt).toISOString()
    this.lastTokenCreated.expiresAt = moment.unix(expiresAt).toISOString()
    this.save()
}

const User = mongoose.model('User', schema)
module.exports = User
