const mysql = require('mysql');

// conexión a la base de datos
const connection = mysql.createConnection({
  host: 'mysql-combeneficios.alwaysdata.net',
  user: '244398',
  password: '16aa3240e',
  database: 'combeneficios_database',
});

connection.connect((error) => {
  if (error) {
    console.log('error de conexión : ' + error);
    return;
  }
  console.log('conexión exitosa');
});

module.exports = connection;
