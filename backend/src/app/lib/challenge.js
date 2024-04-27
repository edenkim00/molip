/* eslint-disable no-unused-vars */
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const Service = require("../Service");
const Provider = require("../Provider");
require("dotenv").config();

async function createChallenge(data, verifiedToken) {
  const userIdFromToken = verifiedToken.userId;
  // Validation
  // 0. 필요한 정보가 빠지지는 않았는지
  // 1. 챌린지 이름 20글자 이내
  // 2. 챌린지 설명 150글자 이내
  // 3. 비밀번호 4글자 이상 10글자 이하
  const { name, description, private, password } = data;
  const createrId = userIdFromToken;
  console.log("name", name);
  console.log("description", description);
  console.log("private", private);
  console.log("password", password);

  if (
    !name ||
    !description ||
    private == undefined ||
    !password ||
    !createrId
  ) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (name.length > 20) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (description.length > 150) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (password.length < 4 || password.length > 20) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  // 이름 중복확인

  // Provider or Service
  try {
    await Service.createChallenge(
      name,
      description,
      private,
      password,
      createrId
    );
  } catch (err) {
    console.error(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  // Return - Response
  return response(baseResponse.SUCCESS);
}

async function getChallenges(data, verifiedToken) {
  const { user_id } = data;
  if (!user_id) {
    //select all challenges
    const result = await Provider.getAllChallenges();
    return response(baseResponse.SUCCESS, result);
  } else {
    //select challenges with user
    const userIdFromToken = verifiedToken?.userId;
    if (!userIdFromToken) {
      return errResponse(baseResponse.NO_TOKEN);
    }
    if (user_id != userIdFromToken) {
      return errResponse(baseResponse.AUTHORIZATION_FAILED);
    }
    const result = await Provider.getChallengesWithUser(user_id);
    return response(baseResponse.SUCCESS, result);
  }
}

async function record(data, verifiedToken) {
  const { user_id, start, end, challenge_id } = data;
  const userIdFromToken = verifiedToken?.userId;
  if (!user_id || !start || !end || !challenge_id) {
    return errResponse(baseResponse.WRONG_BODY);
  }
  if (userIdFromToken != user_id) {
    return errResponse(baseResponse.AUTHORIZATION_FAILED);
  }
  const result = await Service.record(user_id, start, end, challenge_id);
  return response(baseResponse.SUCCESS);
}

async function joinChallenge(data, verifiedToken) {
  const { user_id, challenge_id } = data;
  const userIdFromToken = verifiedToken.userId;
  if (!user_id || !challenge_id) {
    return errResponse(baseResponse.WRONG_BODY);
  }
  if (userIdFromToken != user_id) {
    return errResponse(baseResponse.AUTHORIZATION_FAILED);
  }
  const result = await Service.joinChallenge(user_id, challenge_id);
  return response(baseResponse.SUCCESS);
}

async function disconnectUserChallenge(data, verifiedToken) {
  const { user_id, challenge_id } = data;
  const userIdFromToken = verifiedToken.userId;
  if (!user_id || !challenge_id) {
    return errResponse(baseResponse.WRONG_BODY);
  }
  if (userIdFromToken != user_id) {
    return errResponse(baseResponse.AUTHORIZATION_FAILED);
  }
  const result = await Service.disconnectUserChallenge(user_id, challenge_id);
  return response(baseResponse.SUCCESS);
}

module.exports = {
  createChallenge,
  getChallenges,
  record,
  joinChallenge,
  disconnectUserChallenge,

};
