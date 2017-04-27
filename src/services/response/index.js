import _ from 'lodash'

export const success = (res, status) => (data=false) => {
    if (!data) {
        return res.status(status || 200).json({ status: 'success' })
    }

    if( _.isString(data)) {
        return res.status(status || 200).json({ status: 'success', message: data })
    } else {
        return res.status(status || 200).json({ status: 'success', data })
    }
}

export const notFound = (res) => (entity) => {
    if (entity) {
        // return entity
        return res.status(404).json({ status: 'error', entity })
    }
    return res.status(404).end()
}

export const notAuthorized = (res) => (message=`Unauthorized or insufficient permission levels`) => {
    return res.status(401).json({ status: 'error', message })
}

export const error = (res, status) => (err) => {
    if (err) {
        return res.status(status || 400).json({ status: 'error', message: err.message })
    }
    return res.status(status || 400).json({ status: 'error '})
}

export const serverError = (res, status) => (err) => {
    if (err) {
        return res.status(status || 500).json({ status: 'error', message: err.message })
    }
    return res.status(status || 500).json({ status: 'error '})
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
    if (entity) {
        const isAdmin = user.role === 'admin'
        const isAuthor = entity[userField] && entity[userField].equals(user.id)
        if (isAuthor || isAdmin) {
            return entity
        }
        res.status(401).end()
    }
    return null
}
