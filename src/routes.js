import { Router } from 'express'
const router = new Router()

import Home from './api/home'
import Auth from './api/auth'
import Register from './api/register'
import User from './api/user'
import Widget from './api/widget'

import config from './config'
import auth from './services/authenticate'
import acl from 'simple-express-acl'

acl.setPrefix( config.apiPrefix )

router.use('/',         Home)
router.use('/auth',     Auth)
router.use('/register', Register)
router.use('/user',     [auth.check, acl.check], User)
router.use('/widget',   [auth.check, acl.check], Widget)

export default router
