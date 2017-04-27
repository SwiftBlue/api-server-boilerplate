import { success, error, notFound } from '../../services/response'

export const index = (req, res, next) => {
    return success(res)({
        message: `Big league, believe me.`
    })
}
