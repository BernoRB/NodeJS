const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'name is required']
    }
    /* La entrega de hoy solo pide usuario pero lo dejo listo para mail y pw
    email: {
        type: 'string',
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, 'password is required'],
    } */
})


/*
UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

UserSchema.methods.comparePassword = (password, hash) => {
    let comp = bcrypt.compareSync(password, hash)
    return comp
}
*/


module.exports = model('User', UserSchema)