const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia según tu usuario de MySQL
  password: '', // Cambia según la contraseña de tu MySQL
  database: 'products_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

module.exports = db;
