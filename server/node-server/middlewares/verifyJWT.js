const jwt = require('jsonwebtoken')
const decode = require('jsonwebtoken/decode')
const verifyJWt = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).send('you need a token')
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) res.status(304).json({ auth: false, message: 'inValid token' })
            else {
                req.userId = decoded.id
                next()
            }
        })
    }
}


module.exports = verifyJWt;