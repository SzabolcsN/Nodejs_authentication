const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app  = express();

dotenv.config();
//Connect to DB
//mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}).catch(error => handleError(error));
mongoose
  .connect( process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true,  auto_reconnect: true, reconnectTries: 60, reconnectInterval: 1000 } )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
//Middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

//PORT
app.listen (8080, () => console.log('Server Up!'));
