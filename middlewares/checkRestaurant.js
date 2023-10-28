export const checkRestaurant = async (req, res, next) => {
    try {
        const role = req.user.role
        if (role === 'restaurant') {
            next()
        } else {
            const error = new Error("شما مجوز دسترسی ندارید.")
            error.statusCode = 401
            throw error
        }
    } catch (err) {
        next(err)
    }
}