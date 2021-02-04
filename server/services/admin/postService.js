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

      const post = new Post({
        content,
        createdBy : resultUser.id,
        createRequest: true,
        createRequestBy : user
      });

      const result = await post.save();
      if (!result) {
        json.error = true;
        json.message = 'Error saving post.';
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

      const result = await Post.findOneAndUpdate({
        _id : postId,
        createdBy : resultUser.id
      },{
        content,
        updatedBy : resultUser.id,
        updateRequest: true,
        updateRequestBy : user
      },{
        new : true
      });
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
      const result = await Post.findOneAndUpdate(
        { 
          _id : postId
        },{
          deletedBy : resultUser.id,
          deleteRequest: true,
          deleteRequestBy : user
        },{
          new: true
        });
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