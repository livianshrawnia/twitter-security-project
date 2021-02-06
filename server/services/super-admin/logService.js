const Log = require('../../models/log')
const { httpErrorCode } = require('../../../constant');

/**
 *
 * @author LIVIAN
 */

 exports.list = async () => {
  let json = {};
  json.result = {};
  
    try{ 

      const logs = await Log.find({}).sort({_id:-1});

      if (!logs) {
        json.result.logs = [];
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;    
      }

      json.result.logs = logs;
      json.error = false;
      json.message = 'Success.';
      json.code = httpErrorCode.SUCCESS;
      return json;

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}