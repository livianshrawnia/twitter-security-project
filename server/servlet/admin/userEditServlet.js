const userService = require('../../services/admin/userService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.userEditServlet = async (req, res) => {
  const { body } = req;
  const user = req.user;
  const userId = string(req.params.userId); 
  const email = string(body.email);  
  const username = string(body.username);  
  const name = string(body.name);  
  const password = string(body.password);  
  const role = string(body.role);  
  const json = await userService.edit(user, userId, email, username, name, password, role);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }