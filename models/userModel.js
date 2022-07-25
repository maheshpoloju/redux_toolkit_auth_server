const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'})
    return token
}

const User = mongoose.model('mytablereact', userSchema)

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('username'),
        email: Joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password')

    })

    return schema.validate(data)
}

module.exports = {User, validate}