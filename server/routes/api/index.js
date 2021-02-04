const router = require('express').Router();
const websiteRoutes = require('./website');
const adminRoutes = require('./admin');

// website routes
router.use('/web', websiteRoutes);

// admin routes
router.use('/admin', adminRoutes);

module.exports = router;
