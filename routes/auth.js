const router = require('express').Router();
const User = require('../models/User');
const { registerSchema } = require('../services/validation');

router.post('/register', async (req, res, next)=>{

    try { 
        
        //validate the data from request body
        const result = await registerSchema.validateAsync(req.body);

        //check if the user already exists by email
        const emailExists = await User.findOne({email: req.body.email});
        if (emailExists) return res.status(400).send("An account connected to this email already exists");

        //create the new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        //save the user to the database
        savedUser = await user.save();
        res.status(201).send(savedUser)

    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
});

module.exports = router;