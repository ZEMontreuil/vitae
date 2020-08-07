const mysql = require('mysql');
const dbConfig = require('./config/connectionConfig');

const connection = mysql.createConnection({
  host: dbConfig.hostm,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = connection;