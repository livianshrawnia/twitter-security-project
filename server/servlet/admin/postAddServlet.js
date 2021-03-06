const postService = require('../../services/admin/postService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.postAddServlet = async (req, res) => {
  const { body } = req;
  const username = string(body.username);  
  const content = string(body.content);  
  const user = req.user;
  const json = await postService.add(user, username, content);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }