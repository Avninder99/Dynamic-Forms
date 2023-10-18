require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');

const connectToDatabase = require('./utils/db')

const corsOptions = {
    cors: {
        origin: '*'
    }
}

connectToDatabase();

const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;
app.use(passport.initialize());

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server started at port ${ PORT }`);
})