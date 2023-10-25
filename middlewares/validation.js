export const validation = schema => async (req, res, next) => {
    const body = req.body
    try {
        await schema.validate(body, {abortEarly: false})
        next()
    } catch (err) {

        const errorArr = [];
        let names = [];

        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
            names.push(e.path)
        });

        const errorName = [...new Set(names)]
        let errors = {}
        errorName.map(item => {
            let message = []
            errorArr.map(e => {
                if (e.name === item) {
                    message.push(e.message)
                }
            })
            errors = {...errors, [item]: message}
        })
        const error = new Error("خطا در اعتبار سنجی")
        error.errors = errors
        error.statusCode = 422
        next(error)
    }
}