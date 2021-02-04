const Post = require('../../models/post');
const User = require('../../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { httpErrorCode } = require('../../../constant');

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} user 
 * @param {*} userId 
 * @param {*} email 
 * @param {*} username 
 * @param {*} name 
 * @param {*} password 
 * @param {*} role 
 */
exports.edit = async (user, userId, email, username, name, password, role) => {
  let json = {};
  json.result = {};
  
    try{ 
      
      if (validator.isEmpty(email)) {
        json.error = true;
        json.message = 'Please enter email address.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'Please enter valid email address.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(username)) {
        json.error = true;
        json.message = 'You must enter a username.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(username, {min : 3})) {
        json.error = true;
        json.message = 'Username must be at least 3 characters long.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(role)) {
        json.error = true;
        json.message = 'You must enter a role of user.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(password)) {
        json.error = true;
        json.message = 'You must enter a password.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isLength(password, {min : 8})) {
        json.error = true;
        json.message = 'Password must be at least 8 characters long.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      password = hashedPassword;
    
      const query = { _id: userId };
      const update = {
        email,
        username,
        name,
        password,
        role,
        updatedBy : user
      };

      const result = await User.findOneAndUpdate(query,update,{ new: true });
      if(!result){
        json.error = true;
        json.message = 'Error updating user.';
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;      
      }
      json.result.user = result;
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