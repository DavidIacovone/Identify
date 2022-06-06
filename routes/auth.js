const router = require('express').Router();
const User = require('../models/User');
const { registerSchema } = require('../services/validation');

router.post('/register', async (req, res, next)=>{

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const result = await registerSchema.validateAsync(req.body);

        savedUser = await user.save();
        res.send(savedUser)

    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
});

module.exports = router;