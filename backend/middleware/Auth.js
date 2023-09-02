const jwt = require('jsonwebtoken');
const User = require('../Models/Usermodel')

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    console.log("auth-token",token);

    if (!token) {
        return res.status(401).json({ sucess: false, message: "please login to access detail" })
    }

    const data = jwt.verify(token, process.env.JWT_KEY)
    req.id = data.id;
    next()


}



