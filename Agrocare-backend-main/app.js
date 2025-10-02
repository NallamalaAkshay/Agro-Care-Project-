const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const { readdirSync, read } = require("fs")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
dotenv.config()
const db = require("./db/db");
db();
app.use(cors({
    origin: "*",
}))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)))
app.get("/", (req, res) => {
    res.send("Server Connected successfully")
})
app.listen(process.env.PORT || 5000, (req, res) => {
    console.log("server is connected successfully")
})