const express = require('express')
const app = express()

// Import the database config
const db = require('./configs/db.js')

app.listen(8080,()=>{
  console.log('App is in http://localhost:8080')
})

app.set('view engine','ejs')
app.use(express.static('public'))
// Homepage Route
app.get('/',(req,res)=>{
  res.render('index')
})



