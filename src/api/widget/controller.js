import { success, error, notFound } from '../../services/response'

export const index = (req, res, next) => {
    return success(res)([
        {
            id:        1,
            name:      'Fidget Widget',
            color:     'blue',
            sizes:     [ 'small', 'medium', 'large' ],
            available: true
        },
        {
            id:        2,
            name:      'Anvil',
            color:     'black',
            sizes:     [ 'x-large' ],
            available: false
        }
    ])
}
