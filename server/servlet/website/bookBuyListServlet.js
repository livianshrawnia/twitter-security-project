const bookService = require('../../services/website/bookService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');

exports.bookBuyListServlet = async (req, res) => {
  const user = req.user._id;
  const json = await bookService.buyList(user);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }