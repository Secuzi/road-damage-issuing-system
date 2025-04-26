import createError from 'http-errors'

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        return next(createError(400, {message: result.error.errors[0].message}))
    }
    req.body = result.data
    next()
}

export default validate
