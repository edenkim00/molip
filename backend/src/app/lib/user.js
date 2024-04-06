/* eslint-disable no-unused-vars */
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const Service = require("../Service");
require("dotenv").config();

async function signUp(data) {
  // Validation
  // 1. 값이 다 있는지
  // 2. 아이디 길이 (5글자 이상 30자 이하)
  // 3. 비밀번호 길이 (8자 이상 20자 이하)
  // 4. 이메일 형식
  const { id, password, email } = data;

  if (!id || !password || !email) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (id.length > 30 || id.length < 5) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (password.length < 8 || password.length > 20) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  // Provider or Service
  try {
    await Service.signUp(id, password, email);
  } catch (err) {
    console.error(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  // Return - Response
  return response(baseResponse.SUCCESS);
}


async function deleteUser(data, verifiedToken) {
  const userId = verifiedToken.userId;
  try {
    await Service.deleteUser(userId);
  } catch (err) {
    console.error(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  // Return - Response
  return response(baseResponse.SUCCESS);
  
}


module.exports = {
  signUp,
  deleteUser,

};
