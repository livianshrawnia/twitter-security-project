const router = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
const { httpStatusCode } = require('../../constant');
const { apiURL } = keys.app;

const api = `/${apiURL}`;

// api routes
router.use(api, apiRoutes);
const json = { error : true, message : '404 Not Found'}
router.use(api, (req, res) => res.status(httpStatusCode.NOT_FOUND).json(json));

module.exports = router;
