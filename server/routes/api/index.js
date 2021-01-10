const router = require('express').Router();
const websiteRoutes = require('./website');

// website routes
router.use('/web', websiteRoutes);

module.exports = router;
