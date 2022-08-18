const { createTransport } = require('nodemailer')
const logger = require('../utils/logger')

const TEST_MAIL = process.env.ADMINMAIL

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'carli.sporer@ethereal.email',
        pass: 'fd6dq7Pabs71sCpxkr'
    }
})

module.exports = function (subject, html) {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: subject,
        html: html
    }

    try {
        const info =  transporter.sendMail(mailOptions)
        logger.loggerConsole.info(info)
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}