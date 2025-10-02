const mongoose = require("mongoose")


const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        console.log("database is connected")
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
module.exports = connectDb