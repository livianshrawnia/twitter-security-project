const Log = require('../../models/log');
const User = require('../../models/user');
const Post = require('../../models/post');
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
 * @param {*} requestId 
 * @param {*} isApprove
 */
exports.approve = async (user, requestId, isApprove = false) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (!validator.isMongoId(requestId)) {
        json.error = true;
        json.message = 'Invalid requestId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const resultRequest = await Request.findOne({_id: requestId});
      if(!resultRequest){
        json.error = true;
        json.message = 'Invalid requestId.';
        json.code = httpErrorCode.USER_ERROR;
        return json;      
      }
      
      if(isApprove){     

      let str = '';
      switch (resultRequest.type) {
        case requestType.CREATE:
          str = 'post';
          const post = new Post({
            content : resultRequest.post.content,
            createdBy : resultRequest.post.createdBy,
          });
          const resultPostSave = await post.save();
          if(!resultPostSave){
            json.error = true;
            json.message = 'Error saving post.';
            json.code = httpErrorCode.SERVER_ERROR;
            return json;      
          }
          break;
        case requestType.UPDATE:
          if(resultRequest.isUser){
            str = 'user';
            const userUpdate = {
              email : resultRequest.user.email,
              username : resultRequest.user.username,
              name : resultRequest.user.name,
              password : resultRequest.user.password,
              role : resultRequest.user.role,
            }
            const resultUserUpdate = await User.findOneAndUpdate({_id: resultRequest.user.id}, userUpdate);
            if(!resultUserUpdate){
              json.error = true;
              json.message = 'Error updating user.';
              json.code = httpErrorCode.SERVER_ERROR;
              return json;      
            }
          }else{
            str = 'post';
            const postUpdate = {
              content : resultRequest.post.content,
              createdBy : resultRequest.post.createdBy
            };
            const resultPostUpdate = await Post.findOneAndUpdate({_id : resultRequest.post.id}, postUpdate);
            if(!resultPostUpdate){
              json.error = true;
              json.message = 'Error updating post.';
              json.code = httpErrorCode.SERVER_ERROR;
              return json;      
            }
          }
          break;
        case requestType.DELETE:
          str = 'post';
          const resultPostDelete = await Post.findOneAndDelete({_id : resultRequest.post.id});
          if(!resultPostDelete){
            json.error = true;
            json.message = 'Error deleting post.';
            json.code = httpErrorCode.SERVER_ERROR;
            return json;      
          }
          break;
        
        default:
          break;
        }

        const resultAdminUser = await User.findOne({_id: resultRequest.requestedBy});
        const log = new Log({
          type : logType.AUDIT,
          content : `Super-admin ${user.username} approved ${resultRequest.type} ${str} request from Admin ${resultAdminUser.username}`,
          createdBy : user.id
        });
        log.save();
        Request.findOneAndUpdate({_id : requestId},{isApproved : true});

      }      

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