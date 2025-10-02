const connectDB = require("../db/db"); 
const dotenv = require('dotenv')
dotenv.config()
const { importProducts } = require("../controllers/productController");
const mongoose = require("mongoose")

const runImport = async () => {
    await connectDB(); 
    await importProducts();
    mongoose.connection.close();
};

runImport().catch((error) => console.error("Error in import script:", error.message));
