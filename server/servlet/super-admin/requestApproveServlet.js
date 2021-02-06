const requestService = require('../../services/super-admin/requestService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string, boolean } = require('../../helpers/dataType');

exports.requestApproveServlet = async (req, res) => {
  const { body } = req;
  const user = req.user;
  const requestId = string(req.params.requestId);  
  const isApprove = boolean(body.isApprove);
  const json = await requestService.approve(user, requestId, isApprove);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }