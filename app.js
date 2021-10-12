require('express-async-errors');
require("dotenv").config();
var express = require('express');
var app = express();
require('./startup/routes')(app);
module.exports = app;




