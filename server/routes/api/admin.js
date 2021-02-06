const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const { userEditServlet } = require('../../servlet/admin/userEditServlet');
const { postAddServlet } = require('../../servlet/admin/postAddServlet');
const { postEditServlet } = require('../../servlet/admin/postEditServlet');
const { postDeleteServlet } = require('../../servlet/admin/postDeleteServlet');
const { postGetServlet } = require('../../servlet/admin/postGetServlet');

// Admin Routes
router.put('/user/edit/:userId', auth, role.checkRole(role.ROLES.Admin), userEditServlet);

router.post('/post/add', auth, role.checkRole(role.ROLES.Admin), postAddServlet);
router.put('/post/edit/:postId', auth, role.checkRole(role.ROLES.Admin), postEditServlet);
router.delete('/post/delete/:postId', auth, role.checkRole(role.ROLES.Admin), postDeleteServlet);
router.get('/post/get/:postId', auth, role.checkRole(role.ROLES.Admin), postGetServlet);

module.exports = router;
