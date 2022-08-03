const { createTransport } = require('nodemailer')

const TEST_MAIL = 'louisa12@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'louisa12@ethereal.email',
        pass: 'KFfRsQu8U4kRYKhjCJ'
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
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}