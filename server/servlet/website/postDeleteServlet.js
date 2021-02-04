const postService = require('../../services/website/postService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.postDeleteServlet = async (req, res) => {
  const { body } = req;
  const postId = string(req.params.postId);  
  const user = req.user._id;
  const json = await postService.delete(user, postId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }