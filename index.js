const server = require('./src/app');

const keepAlive = server.listen(3000, () => {
  console.log('liten on port 3000');
});

keepAlive.keepAliveTimeout = 30 * 1000;
keepAlive.headersTimeout = 35 * 1000;
