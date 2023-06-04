const mongoose = require('mongoose')
const dbConfig = require('./db')

const connectDB = async() => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(dbConfig.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })        
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } 
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB