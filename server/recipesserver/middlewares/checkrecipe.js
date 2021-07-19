const checkRecipe = (schema) => async (req, res, next) => {
    const body = req.body.values
    console.log('validation', body);

    try {
        await schema.validate(body)
        next()
        return next()
    } catch (err) {
        console.log(err);
        res.status(400).send(err)

    }
}
module.exports = checkRecipe