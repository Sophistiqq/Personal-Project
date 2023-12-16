const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '091534',
  database: 'ChatApp'
})

db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log('Connected to Database!')
})
