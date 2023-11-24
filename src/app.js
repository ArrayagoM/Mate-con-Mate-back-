const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const route = require('./routes/index');

const limit = rateLimit({
  windowMS: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const limitPayloadSize = (req, res, next) => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE) {
    return res.status(413).json({ error: 'Payload size exceeds the limit' });
  }
  next();
};

const server = express();

server.use(
  cors({
    origin: 'http://localhost:3000',
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
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'"
  );
  next();
});
server.use('/', route);

module.exports = server;
