const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.statusCode(400).send(error);
    }
});

module.exports = router;