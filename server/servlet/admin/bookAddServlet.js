const bookService = require('../../services/website/bookService');
const { getHttpStatusCode } = require('../../helpers/httpStatus');
const { httpErrorCode } = require('../../../constant');
const { string } = require('../../helpers/dataType');

exports.bookAddServlet = async (req, res) => {
  const { body } = req;
  const name = string(body.name);
  const author = string(body.author);
  const json = await bookService.add(name, author);    
    if(json.code !== httpErrorCode.SUCCESS){
      return res.status(getHttpStatusCode(json.code)).json(json);
    }else{
      res.status(getHttpStatusCode(json.code)).json(json);
    }

  }