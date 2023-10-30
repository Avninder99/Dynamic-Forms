require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const sockets = require('./utils/socket');

const cors = require('cors');
const passport = require('passport');

const connectToDatabase = require('./utils/db')

const corsOptions = {
    cors: {
        origin: '*'
    }
}

connectToDatabase();
sockets(io);

const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;
app.use(passport.initialize());

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);

server.listen(PORT, () => {
    console.log(`server started at port ${ PORT }`);
})