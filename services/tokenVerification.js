const jwt = require('jsonwebtoken');

function verify (req, res, next) {

    //check if the auth token is present
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access denied");

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}