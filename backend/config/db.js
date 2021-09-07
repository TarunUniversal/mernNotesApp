const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = connectDB;