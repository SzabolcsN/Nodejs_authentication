const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const bodyParser = require('body-parser');

const app  = express();

dotenv.config();
//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}).catch(error => handleError(error));
//Middleware
//app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


//PORT
app.listen (3000, () => console.log('Server Up!'));