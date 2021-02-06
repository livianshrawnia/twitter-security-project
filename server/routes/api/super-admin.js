const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const { insightGenerateServlet } = require('../../servlet/super-admin/insightGenerateServlet');
const { requestApproveServlet } = require('../../servlet/super-admin/requestApproveServlet');
const { logListServlet } = require('../../servlet/super-admin/logListServlet');

// Super Admin Routes
router.post('/insight/generate', auth, role.checkRole(role.ROLES.SuperAdmin), insightGenerateServlet);
router.put('/request/approve/:requestId', auth, role.checkRole(role.ROLES.SuperAdmin), requestApproveServlet);
router.get('/log/list', auth, role.checkRole(role.ROLES.SuperAdmin), logListServlet);

module.exports = router;
