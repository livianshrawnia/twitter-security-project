const Post = require('../../models/post');
const Log = require('../../models/log');
const validator = require('validator');
const { httpErrorCode, logType } = require('../../../constant');

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
        createdBy : user.id
      });

      const resultPost = await post.save();
      if (!resultPost) {
        json.error = true;
        json.message = 'Error saving tweet. Please try again.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const log = new Log({
        type : logType.ACTION,
        content : `User ${user.username} twitted.`,
        createdBy : user.id
      });
      log.save();

      json.result.post = resultPost;
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
      const post = await Post.findOneAndDelete({createdBy : user.id, _id : postId});
      if (!post) {
        json.error = true;
        json.message = 'Invalid postId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      
      const log = new Log({
        type : logType.AUDIT,
        content : `User ${user.username} deleted tweet.`,
        createdBy : user.id
      });
      log.save();

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

/**
* 
* @param {*} user 
*/
 exports.list = async (user) => {
  let json = {};
  json.result = {};
  
    try{ 
      const query = {
        createdBy : user.id
      };
      const posts = await Post.find(query).sort({_id : -1});

      json.result.posts = posts;
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