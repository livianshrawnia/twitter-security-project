const postService = require('../../services/website/postService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.postAddServlet = async (req, res) => {
  const { body } = req;
  const content = string(body.content);  
  const user = req.user;
  const json = await postService.add(user, content);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }