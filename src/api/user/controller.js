import { success, error, notFound } from '../../services/response'

export const index = (req, res, next) => {
    let response = {
        id:          req.user._id,
        email:       req.user.email,
        gravatar:    req.user.gravatar(),
        roles:       req.user.roles,
        profile:     req.user.profile
    }

    return success(res)( response )
}
