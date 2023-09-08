require('dotenv').config()

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/DbConnection');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500

connectDB()