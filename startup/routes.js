const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors');
const ysquare = require('../routes/ysquare');
module.exports = function (app) {
    app.use(logger('dev'));
    app.use(express.json({ limit: '10mb', extended: true }));
    app.use(express.urlencoded({ limit: '10mb', extended: false }));
    app.use(cookieParser({ strict: false }));
    app.use('/uploads', express.static('uploads'));
    app.use(cors());
    app.use('/', ysquare);
    app.use(function (req, res, next) {
        res.status(404).send({ status: 'error', msg: 'not found' });
    });
    app.use(function (err, req, res, next) {
        if (err.name == 'UnauthorizedError') return res.status(401).send({ status: 'error', msg: 'Authentication failed' });
        console.log(err);
        res.status(500).send({ status: 'error', msg: 'internal Server Error' });
    });
}

