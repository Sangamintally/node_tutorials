const express = require('express')
const { connectDB } = require('./db');
const bodyParser = require('body-parser')
const app = express()
 
app.use(bodyParser.json());

connectDB(); // Connect to MongoDB first

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

app.get('/', (req, res) => {
  res.send('Hello World This is again i start learning')
})


app.listen(4000,()=>console.log("Server is starting on port no. 4000"))