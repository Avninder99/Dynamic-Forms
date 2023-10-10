const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

module.exports = pool;




// module.exports = connectDB = () => {
//     const pool = mysql.createPool({
//         host: 'localhost',
//         user: process.env.DB_USERNAME,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0,
//         enableKeepAlive: true,
//         keepAliveInitialDelay: 0
//     });

//     return pool;
// }