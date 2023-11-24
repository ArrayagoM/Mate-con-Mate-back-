const { Router } = require('express');
const user = require('./UserRoutes');
const post = require('./PosteoRoutes');
const route = new Router();

route.use('/user', user);
route.use('/post', post);

module.exports = route;
