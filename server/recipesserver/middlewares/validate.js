
const db = require('../models/index');
const User = db.users
const validation = (schema) => async (req, res, next) => {
    const body = req.body
    console.log('validation', body);
    
    try {
        // const user = await User.findOne({
        //     where: { email: body.email }
        // })
        // if (user) {
        //     res.status(400).send('the email already exist');
        // }

        await schema.validate(body)

        next()
        return next()
    } catch (err) {
        console.log(err);
        res.status(400).send(err)

    }
}
module.exports = validation