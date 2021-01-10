const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');

const { bookAddServlet } = require('../../servlet/website/bookAddServlet');
const { bookListServlet } = require('../../servlet/website/bookListServlet');
const { bookBuyServlet } = require('../../servlet/website/bookBuyServlet');
const { bookBuyListServlet } = require('../../servlet/website/bookBuyListServlet');
const { accountSignupServlet } = require('../../servlet/website/accountSignupServlet');
const { accountSigninServlet } = require('../../servlet/website/accountSigninServlet');

// Books Routes
router.post('/book/add', bookAddServlet);
router.get('/book/list', bookListServlet);
router.post('/book/buy', auth, bookBuyServlet);
router.get('/book/buy/list', auth, bookBuyListServlet);

// Account Routes
router.post('/account/signup', accountSignupServlet);
router.post('/account/signin', accountSigninServlet);

module.exports = router;
