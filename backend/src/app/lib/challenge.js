/* eslint-disable no-unused-vars */
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const Service = require("../Service");
const Provider = require("../Provider");
require("dotenv").config();

async function createChallenge(data, verifiedToken) {
  const userIdFromToken = verifiedToken.userId;
  const { name, description, private, password, image_url: imageUrl } = data;
  const createrId = userIdFromToken;

  if (!name || !description || (private && !password) || !createrId) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (name.length >= 20) {
    return errResponse(baseResponse.CHALLENGE_CREATION_NAME_LENGTH_ERROR);
  }

  if (description.length >= 150) {
    return errResponse(
      baseResponse.CHALLENGE_CREATION_DESCRIPTION_LENGTH_ERROR
    );
  }
  if (password) {
    if (password.length < 4 || password.length > 20) {
      return errResponse(baseResponse.CHALLENGE_CREATION_PASSWORD_LENGTH_ERROR);
    }
  }

  // Provider or Service
  try {
    const doesExist = await Provider.checkChallengeName(name);
    if (doesExist) {
      return errResponse(baseResponse.ALREADY_EXISTING_CHALLENGE);
    }

    const challengeId = await Service.createChallenge(
      name,
      description,
      private,
      password,
      createrId,
      imageUrl
    );
    await Service.connectUserChallenge(createrId, challengeId);
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
  const { start, end, challenge_id } = data;
  const userIdFromToken = verifiedToken?.userId;
  if (!start || !end || !challenge_id) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  const result = await Service.record(
    userIdFromToken,
    start,
    end,
    challenge_id
  );
  return response(baseResponse.SUCCESS);
}

async function connectUserChallenge(data, verifiedToken) {
  const { user_id, challenge_id } = data;
  const userIdFromToken = verifiedToken.userId;
  if (!user_id || !challenge_id) {
    return errResponse(baseResponse.WRONG_BODY);
  }
  if (userIdFromToken != user_id) {
    return errResponse(baseResponse.AUTHORIZATION_FAILED);
  }
  const suc = await Service.connectUserChallenge(user_id, challenge_id);
  if (!suc) {
    return errResponse(baseResponse.ALREADY_EXISTING_CONNECTION);
  }
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
  const suc = await Service.disconnectUserChallenge(user_id, challenge_id);
  if (!suc) {
    return errResponse(baseResponse.DB_ERROR);
  }
  return response(baseResponse.SUCCESS);
}

module.exports = {
  createChallenge,
  getChallenges,
  record,
  connectUserChallenge,
  disconnectUserChallenge,
};
