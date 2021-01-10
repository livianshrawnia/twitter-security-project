const Book = require('../../models/book');
const User = require('../../models/user');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');

/**
 *
 * @author LIVIAN
 */

 /**
  * 
  */
exports.list = async () => {
  let json = {};
  json.result = {};
  
    try{ 
      const query = {};
      const projection = {name: 1, author: 1};
      const result = await Book.find(query, projection).sort({_id : -1});

      if (!result) {
        json.result.books = [];
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result.books = result;
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

/**
 * 
 * @param {*} name 
 * @param {*} author 
 */
exports.add = async (name, author) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a book name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(author)) {
        json.error = true;
        json.message = 'You must enter a book author.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const book = new Book({
        name,
        author
      });

      const result = await book.save();

      json.result.book = result;
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

/**
 * 
 * @param {*} user 
 * @param {*} bookId 
 */
exports.buy = async (user, bookId) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(bookId)) {
        json.error = true;
        json.message = 'Invalid bookId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const resultUser = await User.findOne({_id : user});
      if(!resultUser){
        json.error = true;
        json.message = 'Invalid user.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const userBooksCount = resultUser.books.length;
      if(userBooksCount >= 2){
        json.error = true;
        json.message = 'You have exeeds borrowing limit of 2 books.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const result = await Book.findOneAndDelete({'_id' : bookId});
      if(!result){
        json.error = true;
        json.message = 'Cannot find book.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const singleBookObject = {
        name : result.name,
        author : result.author
      };

      const result1 = await User.updateOne({'_id' : user}, {'$push': {
        'books': singleBookObject
      }});

      json.result.book = result;
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

/**
* 
* @param {*} user 
*/
 exports.buyList = async (user) => {
  let json = {};
  json.result = {};
  
    try{ 
      const query = {_id : user};
      const projection = {books: 1, _id : 0};
      const result = await User.find(query, projection).sort({_id : -1});

      if (!result) {
        json.result.books = [];
        json.error = false;
        json.message = 'Success.';
        json.code = httpErrorCode.SUCCESS;
        return json;
      }

      json.result = result;
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