const Log = require('../../models/log');
const User = require('../../models/user');
const Request = require('../../models/request');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { httpErrorCode, logType, requestType } = require('../../../constant');

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
      const resultFindUserById = await User.findOne({_id : userId});
      if (!resultFindUserById) {
        json.error = true;
        json.message = 'User doesn\'t exists.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
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
      const resultFindUserByEmail = await User.findOne({email});
      if (resultFindUserByEmail) {
        json.error = true;
        json.message = 'Email address is already in use.';
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
      const resultFindUserByUsername = await User.findOne({username});
      if (resultFindUserByUsername) {
        json.error = true;
        json.message = 'Username is already in use.';
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
    
      const request = Request({
        user : {
          id : userId,
          email,
          username,
          name,
          password,
          role
        },
        isUser : true,
        type : requestType.UPDATE,
        requestedBy : user.id        
      });

      const result = await request.save();
      if(!result){
        json.error = true;
        json.message = 'Error saving request.';
        logger.emerg(JSON.stringify(json.message));
        json.code = httpErrorCode.SERVER_ERROR;
        return json;      
      }

      const log = new Log({
        type : logType.ACTION,
        content : `Admin ${user.username} requested to edit user ${username}.`,
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