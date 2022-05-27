const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const  mongoUri = process.env.MONGO_URI
const PORT = process.env.PORT
const cors = require('cors')    //allow ajax requests from frontend devserver to the backend
const morgan = require('morgan') //morgan log on console every request to the server tiny config show as small messages
const bodyParser = require('body-parser') //body parser gonna transform the body of every request in json
const bucketListItemRoutes = require('./routes/api/BucketListItems')




app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


//Connection with mongo via mongoose
mongoose
    .connect(mongoUri)
    .then(() =>console.log('MongoDB is connected succefully'))
    .catch(err => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)
app.get('/',(req, res) =>  res.send('Welcome to bucket list'))
app.get('/admins',(reqadm, resadm) =>  resadm.send('Hello Admin'))

app.listen(PORT, () => console.log(`App todo listening at http://localhost:${PORT}`));