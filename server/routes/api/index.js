const router = require('express').Router();
const websiteRoutes = require('./website');
const adminRoutes = require('./admin');
const superAdminRoutes = require('./super-admin');

// website routes
router.use('/web', websiteRoutes);

// admin routes
router.use('/admin', adminRoutes);

// super admin routes
router.use('/super-admin', superAdminRoutes);

module.exports = router;
