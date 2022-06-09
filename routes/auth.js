const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { registerSchema } = require('../services/validation');

//register endpoint
router.post('/register', async (req, res, next)=>{

    try { 
        
        //validate the data from request body
        const result = await registerSchema.validateAsync(req.body);

        //check if the user already exists by email
        const emailExists = await User.findOne({email: req.body.email});
        if (emailExists) return res.status(400).send("An account connected to this email already exists");

        //Hash password
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        //create the new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        //save the user to the database
        savedUser = await user.save();
        res.status(201).send({user: user._id})

    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
});

//login endpoint
router.post('/login', async (req, res) =>{
    

});

module.exports = router;