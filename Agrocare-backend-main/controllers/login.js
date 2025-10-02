const user = require("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Emailvalidator = require("email-validator");

exports.getUserDetails = async(req, res) => {
    const {userId} = await req.body;
    console.log(userId);
    try {
        const userData = await user.findById({ _id: userId })
        res.status(200).json({ userData })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: err })
    }
}


exports.Login = async(req, res) => {
    try {
        const { email, password } = await req.body
        var loginId;
        if (email) {
            const validateEmail = Emailvalidator.validate(email)
            if (!validateEmail) return res.status(401).json({ message: "Invalid Email" });
            loginId = { email: email }
        }
        const User = await user.findOne(loginId).select("+password")
        if (!User) {
            res.status(404).json({ message: "Invalid username or email" })
        }
        const verifiedPassword = await bcrypt.compare(password, User.password)
        if (!verifiedPassword) {
            res.status(404).json({ message: "Ivalid User Password" })
        } else {
            const payload = { userId: User._id }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })
            res.json({
                id: User._id,
                name: User.name,
                token: token,
                verified: User.verified ,
                message: "Login Success",
                email: User.email
            })
        }

    } catch (err) {
        console.log(err)
    }
}