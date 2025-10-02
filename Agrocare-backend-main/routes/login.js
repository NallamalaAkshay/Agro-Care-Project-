const express = require("express")
const router = express.Router()
const { Login, getUserDetails } = require("../controllers/login")

router.post("/login", Login)
router.post("/getUser", getUserDetails)

module.exports = router