const mongoose = require('mongoose');


const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Database Connected");
    } catch (error) {
        console.log('Database connection error');
    }
}

module.exports = connectToDatabase;