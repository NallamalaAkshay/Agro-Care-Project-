const user = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Emailvalidator = require("email-validator");
exports.createUser = async(req, res) => {
        try {
            const { email, name, password , role } = req.body
            console.log(email , name , password , role)
            const checkUser = await user.findOne({ "email": email })
            if (checkUser) {
                res.status(404).json("email already available")
            }
            const validateEmail = Emailvalidator.validate(email)
            if (!validateEmail) return res.status(401).json("Invalid Email");
            const User = new user({
                password: password,
                email: email,
                role: role,
                name: name
            })
            const saltrounds = 10
            User.password = await bcrypt.hash(password, saltrounds)
            User.save()
            const payload = { userId: User._id }
            const NewToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })
            res.json({
                id: User._id,
                name: User.name,
                token: NewToken,
                verified: User.verified,
                message: "Register Success redirecting to home page",
                email: User.email
            })
        } catch (err) {
            console.log(err)
        }
}
