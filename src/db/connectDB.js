const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database");
    } catch (error) {
        console.log("Mongodb error :",error);
    }
}

module.exports = connectDB