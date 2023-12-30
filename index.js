const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// Import the database config
const db = require('./configs/db.js')

app.listen(8080,()=>{
  console.log('App is in http://localhost:8080')
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
// Homepage Route
app.get('/',(req,res)=>{
  res.render('index')
})


app.get('/products',(req,res)=>{
  res.render('products')
})

app.post('/login',(req,res)=>{
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password],(err, results) => {
    if(err){
      console.error('Database error',err);
      return res.json({success: false, message: 'Internal server error'})
    }

    if(results.length > 0) {
      res.json({success: true, message: 'Login successful'}) 
    } else {
      res.json({success: false, message: 'Invalid credentials'})
    }
  })
})
