/* eslint-disable no-unused-vars */
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const jwt = require("jsonwebtoken");
const Service = require("../Service");
const Provider = require("../Provider");
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
  const wowie = await Provider.checkId(id);
  if (!wowie) {
    return errResponse(baseResponse.ALREADY_EXISTING_ID);
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

async function getUserProfile(data, verifiedToken) {
  const userId = verifiedToken.userId;
  const result = await Provider.getUserProfile(userId);
  if (result.length < 1) {
    return errResponse(baseResponse.NO_USER);
  }

  // Return - Response
  return response(baseResponse.SUCCESS, result[0]);
}

async function signIn(data) {
  const { id, password } = data;
  if (!id || !password) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  const result = await Provider.existUser(id, password);
  if (!result) {
    return errResponse(baseResponse.WRONG_LOGIN_DETAIL);
  }
  const publishedToken = jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
      subject: "userInfo",
    }
  );
  const tokenBody = {
    token: publishedToken,
  };
  return response(baseResponse.SUCCESS, tokenBody);
}

async function changePassword(data) {
  const { id, newPassword } = data;
  if (!id || !newPassword) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (newPassword.length < 8 || newPassword.length > 20) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  try {
    await Service.changePassword(id, newPassword);
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
  getUserProfile,
  signIn,
  changePassword,
};
