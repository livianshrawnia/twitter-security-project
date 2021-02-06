const Post = require('../../models/post');
const Log = require('../../models/log');
const User = require('../../models/user');
const Request = require('../../models/request');
const validator = require('validator');
const { httpErrorCode, logType, requestType } = require('../../../constant');

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} user 
 * @param {*} username
 * @param {*} content 
 */
exports.add = async (user, username, content) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (validator.isEmpty(content)) {
        json.error = true;
        json.message = 'Please enter tweet content.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(username)) {
        json.error = true;
        json.message = 'Please enter tweet content.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const resultUser = await User.findOne({username});
      if (!resultUser) {
        json.error = true;
        json.message = 'Username does not exists.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }      

      const request = Request({
        post : {
          content,
          createdBy : resultUser.id
        },
        type : requestType.CREATE,
        requestedBy : user.id        
      });

      const result = await request.save();
      if (!result) {
        json.error = true;
        json.message = 'Error saving request.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const log = new Log({
        type : logType.ACTION,
        content : `Admin ${user.username} requested to tweet on behalf of user ${resultUser.username}.`,
        createdBy : user.id
      });
      log.save();

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

/**
 * 
 * @param {*} user 
 * @param {*} username
 * @param {*} postId
 * @param {*} content 
 */
exports.edit = async (user, username, postId, content) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (!validator.isMongoId(postId)) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(content)) {
        json.error = true;
        json.message = 'Please enter tweet content.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(username)) {
        json.error = true;
        json.message = 'Please enter tweet content.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const resultUser = await User.findOne({username});
      if (!resultUser) {
        json.error = true;
        json.message = 'Username does not exists.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const resultPost = await Post.findOne({
        createdBy : resultUser.id,
        _id : postId
      });
      if (!resultPost) {
        json.error = true;
        json.message = 'Post does not belong to user.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const request = Request({
        post : {
          id : postId,
          content,
          createdBy : resultUser.id
        },
        type : requestType.UPDATE,
        requestedBy : user.id        
      });

      const result = await request.save();
      if (!result) {
        json.error = true;
        json.message = 'Error saving request.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const log = new Log({
        type : logType.ACTION,
        content : `Admin ${user.username} requested to edit tweet on behalf of user ${resultUser.username}.`,
        createdBy : user.id
      });
      log.save();

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

/**
 * 
 * @param {*} user 
 * @param {*} postId 
 * @param {*} username 
 */
exports.delete = async (user, postId, username) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (!validator.isMongoId(postId)) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(username)) {
        json.error = true;
        json.message = 'You must enter username.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const resultUser = await User.findOne({username});
      if (!resultUser) {
        json.error = true;
        json.message = 'Username does not exists.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const resultPost = await Post.findOne({
        createdBy : resultUser.id,
        _id : postId
      });
      if (!resultPost) {
        json.error = true;
        json.message = 'Post does not belong to user.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const request = Request({
        post : {
          id : postId
        },
        type : requestType.DELETE,
        requestedBy : user.id        
      });

      const result = await request.save();
      if (!result) {
        json.error = true;
        json.message = 'Error saving request.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const log = new Log({
        type : logType.ACTION,
        content : `Admin ${user.username} requested to delete tweet on behalf of user ${resultUser.username}.`,
        createdBy : user.id
      });
      log.save();

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

/**
* 
* @param {*} postId 
*/
 exports.get = async (postId) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isMongoId(postId)) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const post = await Post.findOne({_id:postId});

      if (!post) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      json.result.post = post;
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