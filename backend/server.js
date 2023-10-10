require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    cors: {
        origin: '*'
    }
}

const routes = require('./routes/index');

const PORT = 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server started at port ${ PORT }`);
})