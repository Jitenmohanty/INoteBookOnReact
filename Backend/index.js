const connectToMongo = require('./db');
const express = require('express');
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const cors = require('cors');

connectToMongo();

const app = express()
const port = 3005;

//It is a middleware to request showing on console..
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',authRoutes);
app.use('/api/notes',noteRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})