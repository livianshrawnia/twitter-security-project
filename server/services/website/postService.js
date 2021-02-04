const Post = require('../../models/post');
const User = require('../../models/user');
const validator = require('validator');
const { httpErrorCode } = require('../../../constant');

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} user 
 * @param {*} content 
 */
exports.add = async (user, content) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (validator.isEmpty(content)) {
        json.error = true;
        json.message = 'Please enter tweet content.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const post = new Post({
        content,
        createdBy : user
      });

      const result = await post.save();

      json.result.post = result;
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
 * @param {*} postId 
 */
exports.delete = async (user, postId) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (!validator.isMongoId(postId)) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const result = await Post.findOneAndDelete({createdBy : user, _id : postId});
      if (!result) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      json.result.post = result;
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
 exports.list = async (user) => {
  let json = {};
  json.result = {};
  
    try{ 
      const query = {
        createdBy : user,
        createRequest : false,
        updateRequest : false,
        deleteRequest : false
      };
      const projection = {content: 1, createdAt: 1, updatedAt: 1};
      const result = await Post.find(query, projection).sort({_id : -1});

      if (!result) {
        json.result.posts = [];
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