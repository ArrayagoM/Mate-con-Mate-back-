const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const { limitPayloadSize } = require('./Middleware/limitPayloadSize');
const route = require('./routes/index');
const { connect } = require('./db');
const { URL_LOCAL, POLICY, DEV } = process.env;
const limit = rateLimit({
  windowMS: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const server = express();
connect();
server.use(
  cors({
    origin: URL_LOCAL,
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

server.use(limitPayloadSize);
server.use(express.json());
server.use(morgan('dev'));
server.use(limit);
server.use((req, res, next) => {
  req.setTimeout(5000);
  req.setTimeout(5000);
  next();
});

server.use((req, res, next) => {
  res.setHeader(POLICY, DEV);
  next();
});
server.use('/', route);

module.exports = server;
