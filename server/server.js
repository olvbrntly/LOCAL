require('dotenv').config()

const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/DbConnection');
const mongoose = require('mongoose');
const { appendFile } = require('fs');
const PORT = process.env.PORT || 3001

connectDB();

// lets app recieve and parse json data
app.use(express.json())

//3rd part middleware
app.use(cookieParser());   

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/business', require('./routes/businessRoutes'))


    app.listen(PORT,() => console.log(`Server running on port ${PORT}`));