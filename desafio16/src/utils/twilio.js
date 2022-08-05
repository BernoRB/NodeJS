require('dotenv').config()
const twilio = require('twilio')
const accountSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN
const client = twilio(accountSid, authToken)

module.exports = async (body, to) => {
    const smsOptions = {
        body: body,
        from: process.env.SMSFROM,
        to:   to
    }

    try {
        const message = await client.messages.create({
            body: smsOptions.body,
            from: smsOptions.from,
            to:   smsOptions.to
        })
    } catch (error) {
        logger.loggerError.error(`ERROR: ${error}`)
    }
}