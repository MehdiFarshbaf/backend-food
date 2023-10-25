import jwt from 'jsonwebtoken'

export const verifyTokenAdmin = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    try {
        if (!token) {
            const error = new Error("لطفا ابتدا وارد شوید.")
            error.statusCode = 401
            throw error
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN, (err, decode) => {
            if (err) {
                const error = new Error("توکن منقضی شده است.")
                error.statusCode = 401
                throw error
            }
            req.resurantId = decode._id
            next()
        })

    } catch (err) {
        next(err)
    }
}