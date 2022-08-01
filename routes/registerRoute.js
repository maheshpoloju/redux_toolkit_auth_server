const router = require('express').Router()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const {User} = require('../models/userModel')


const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('username'),
        email: Joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password')
    })
    return schema.validate(data)
}

router.post('/register', async (req, res) => {
    try {
        const {error} = validate(req.body)
        
        if (error){
            return res.status(400).send({message: error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email})
        if (user){
            return res.status(409).send({message: 'Email already exists'})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await new User({...req.body, password: hashedPassword}).save()
        
        res.status(200).send({message: 'User created successfully'})

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
        
    }
})


module.exports = router;