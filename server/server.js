const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = reqwuire('./config/dbConnection');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500