const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../services/validation');

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

    try {

        //validate the data from request body
        const result = await loginSchema.validateAsync(req.body);

        //check if the user already exists by email
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(401).send("The email or password is wrong");  

        //check if password is valid
        const validPassword = await bcryptjs.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send("The email or password is wrong");

        res.status(200).send();
    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }

});

module.exports = router;