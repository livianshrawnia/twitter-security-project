const insightService = require('../../services/super-admin/insightService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.insightGenerateServlet = async (req, res) => {
  const { body } = req;
  const collectionName = string(body.collectionName);  
  const username = string(body.username);  
  const startDate = string(body.startDate);  
  const endDate = string(body.endDate);  
  const json = await insightService.generate(collectionName, username, startDate, endDate);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }