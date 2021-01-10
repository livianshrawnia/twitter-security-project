const bookService = require('../../services/website/bookService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.bookBuyServlet = async (req, res) => {
  const { body } = req;
  const bookId = string(body.bookId);  
  const user = req.user._id;
  const json = await bookService.buy(user, bookId);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }