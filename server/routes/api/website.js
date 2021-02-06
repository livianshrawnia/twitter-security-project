const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const { postAddServlet } = require('../../servlet/website/postAddServlet');
const { postDeleteServlet } = require('../../servlet/website/postDeleteServlet');
const { postListServlet } = require('../../servlet/website/postListServlet');
const { accountSignupServlet } = require('../../servlet/website/accountSignupServlet');
const { accountSigninServlet } = require('../../servlet/website/accountSigninServlet');

// Posts Routes
router.post('/post/add', auth, role.checkRole(role.ROLES.User), postAddServlet);
router.delete('/post/delete/:postId', auth, role.checkRole(role.ROLES.User), postDeleteServlet);
router.get('/post/list', auth, role.checkRole(role.ROLES.User), postListServlet);

// Account Routes
router.post('/account/signup', accountSignupServlet);
router.post('/account/signin', accountSigninServlet);

module.exports = router;
