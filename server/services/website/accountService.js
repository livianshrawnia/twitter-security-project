const User = require('../../models/user');
const Log = require('../../models/log');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { httpErrorCode, logType } = require('../../../constant');
const keys = require('../../config/keys');
const { secret, tokenLife } = keys.jwt;

/**
 *
 * @author LIVIAN
 */

/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 */
exports.signup = async (name, email, username, password) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (validator.isEmpty(name)) {
        json.error = true;
        json.message = 'You must enter a name.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email address.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const jsonIsRegister = await this.isRegister(email);
      if(!jsonIsRegister.error && jsonIsRegister.result.isRegister){
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
        json.message = 'Username must be atleast 3 characters long.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const findUserWithUsernameResult = await User.findOne({username});
      if(findUserWithUsernameResult){
        json.error = true;
        json.message = 'Username is already in use. Please try another username.';
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
      password = await bcrypt.hash(password, salt);

      const user = new User({
        email,
        username,
        name,
        password
      });

      const result = await user.save();
      if (!result) {
        json.error = true;
        json.message = 'Error saving user. Please try again.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }            

      const payload = {
        id: result._id
      };
      const token = await jwt.sign(payload, secret, { expiresIn: tokenLife });

      const log = new Log({
        type : logType.ACCESS,
        content : `User ${result.username} signs up.`,
        createdBy : result.id
      });
      log.save();

      json.result.user = result;
      json.result.token = token;
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
 * @param {*} email 
 * @param {*} password 
 */
exports.signin = async (email, password) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email address.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      if (validator.isEmpty(password)) {
        json.error = true;
        json.message = 'You must enter a password.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const user = await User.findOne({ email });
      if (!user) {
        json.error = true;
        json.message = 'Invalid email address.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const isCorrect  = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        json.error = true;
        json.message = 'Invalid password.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }
      const payload = {
        id: user._id
      };
      const token = await jwt.sign(payload, secret, { expiresIn: tokenLife });

      const log = new Log({
        type : logType.ACCESS,
        content : `User ${user.username} sign in.`,
        createdBy : user.id
      });
      log.save();

      json.result.token = token;
      json.result.user = user;
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
 * @param {*} email 
 */
exports.isRegister = async (email) => {
  let json = {};
  json.result = {};
  
    try{ 

      if (!validator.isEmail(email)) {
        json.error = true;
        json.message = 'You must enter a valid email address.';
        json.code = httpErrorCode.USER_ERROR;
        return json;
      }

      const result = await User.findOne({ email });

      let isRegister = false;
      if(result){
        isRegister = true;
      }

      json.result.isRegister = isRegister;
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