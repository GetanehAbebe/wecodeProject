const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);



exports.sendConfimatioEmail = async function (email,id) {
    const token = await jwt.sign({
        _id: id
    }, process.env.JWT_SECRET_KEY)
    const url = `http://localhost:3200/users/confiramation/${token}`

    try {
        transport.sendMail({
            from: 'yeshialeka@gmail.com',
            to: `<${email}>`,
            subject: 'hello world',
            html: `confirmation email: <a href=${url}>${url} </a>`
        });
        console.log('email sent')
        console.log('secret', process.env.JWT_SECRET_KEY)
        return
    } catch (err) {
        console.log(err.body)
        console.log('email was not sent')
        return
    }
}
