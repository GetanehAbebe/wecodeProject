const auth = (req, res, next) => {
    const { cookies } = req;
    console.log('cookies', cookies);

    if ('session_id' in cookies) {
        if (cookies['session_id'] === '123456') next()
        else res.status(403).send({ msg: 'Not authenticated' })
    } else res.status(403).send({ msg: 'Not authenticated' })
}
module.exports = auth;