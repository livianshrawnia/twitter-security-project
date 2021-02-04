const postService = require('../../services/admin/postService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.postEditServlet = async (req, res) => {
  const { body } = req;
  const postId = string(req.params.postId);  
  const username = string(body.username);  
  const content = string(body.content);  
  const user = req.user._id;
  const json = await postService.edit(user, username, postId, content);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }