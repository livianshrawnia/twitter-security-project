const { httpStatusCode } = require("../../constant");

const ROLES = {
  User: 'ROLE_USER',
  Admin: 'ROLE_ADMIN',
  SuperAdmin: 'ROLE_SUPER_ADMIN'
};

const checkRole = (...roles) => (req, res, next) => {
  let json;
  if (!req.user) {
    json = { error : true, message : 'Unauthorized'}
    return res.status(httpStatusCode.UNAUTHORIZED).json(json);
  }

  const hasRole = roles.find(role => req.user.role === role);
  if (!hasRole) {
    json = { error : true, message : 'You are not allowed to make this request.'}
    return res.status(httpStatusCode.FORBIDDEN).json(json);
  }

  return next();
};

const role = { ROLES, checkRole };

module.exports = role;
