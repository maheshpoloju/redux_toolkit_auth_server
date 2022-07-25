const router = require('express').Router()
const bcrypt = require('bcrypt')

const {User, validate} = require('../models/userModel')

router.post('/register', async (req, res) => {
    // console.log('req', req.body)
    try {
        const {error} = validate(req.body)
        // console.log('BodyData', req.body)
        // console.log('Bodyerror', error)
        if (error){
            return res.status(400).send({message: error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email})
        if (user){
            return res.status(409).send({message: 'Email already exists'})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await new User({...req.body, password: hashedPassword}).save()
        const data = {...req.body}
        
        res.status(200).send({data: data, message: 'User created successfully'})

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
        
    }
})


module.exports = router;