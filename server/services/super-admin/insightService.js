const User = require('../../models/user');
const Post = require('../../models/post');
const Request = require('../../models/request');
const validator = require('validator');
const { httpErrorCode, logType } = require('../../../constant');
const role = require('../../middleware/role');

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} collectionName 
 * @param {*} username
 * @param {*} startDate
 * @param {*} endDate
 */
exports.generate = async (collectionName, username, startDate, endDate) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (validator.isEmpty(collectionName)) {
        json.error = true;
        json.message = 'You must enter a collection name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(username)) {
        json.error = true;
        json.message = 'You must enter a username.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const user = await User.findOne({username});
      if (!user) {
        json.error = true;
        json.message = `User doesn\'t esists.`;
        json.code = httpErrorCode.USER_ERROR;
        return json;
      } 

      if(collectionName === 'post'){
          
        if (validator.isEmpty(startDate)) {
          json.error = true;
          json.message = 'You must enter a startDate.';
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
        if (validator.isEmpty(endDate)) {
          json.error = true;
          json.message = 'You must enter a endDate.';
          json.code = httpErrorCode.USER_ERROR;
          return json;
        }
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        endDate = new Date(endDate.getTime() + 86400000);
        const numOfDays = Math.round((endDate-startDate)/(1000*60*60*24));
        const resultPost = await Post.find({
          createdBy : user.id, 
          createdAt : {
            $gte : startDate
          },createdAt : {
            $lte : endDate
          }
        });
        if(resultPost.length === 0){
          json.error = true;
          json.message = 'There are no tweets.';
          json.code = httpErrorCode.USER_ERROR;
          return json;      
        }
        
        const freq = resultPost.length / numOfDays;
  
        json.error = false;
        json.message = `User ${username} posts ${freq} tweet daily.`;
        json.code = httpErrorCode.SUCCESS;
        return json;

      } else if(collectionName === 'request'){
        const resultRequest = await Request.find({requestedBy : user.id, isApproved : false})
        if(resultRequest.length === 0){
          json.error = true;
          json.message = `There are no changes requests by Admin ${username}.`;
          json.code = httpErrorCode.USER_ERROR;
          return json;      
        }

        json.result.requests = resultRequest;
        json.error = false;
        json.message = `There are ${resultRequest.length} changes requested by Admin ${username}.`;
        json.code = httpErrorCode.SUCCESS;
        return json;
      } else {
        json.error = true;
        json.message = 'Invalid collection name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      

    }catch(e){
        json.error = true;
        json.message = e.message;
        json.code = httpErrorCode.SERVER_ERROR;
        return json;
    }
}