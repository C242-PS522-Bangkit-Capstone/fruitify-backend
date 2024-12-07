const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
  host: '34.101.47.211',  
  user: 'root',       
  password: 'FrutifyCapstone1&',  
  database: 'Fruit_Freshness'  
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

module.exports = db;
